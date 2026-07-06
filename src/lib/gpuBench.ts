// GPU Mining Benchmark Engine — gpubench.online
// Uses WebGPU compute shaders to measure real GPU hashrate

// WGSL compute shader: SHA-256 style hash workload
const SHADER_CODE = `
@group(0) @binding(0) var<storage, read_write> output: array<u32>;
@group(0) @binding(1) var<storage, read_write> counter: atomic<u32>;

// SHA-256-like round function
fn mix(state: ptr<function, array<u32, 8>>, round: u32, msg: u32) {
  // Sigma0: ROTR^2(x) ^ ROTR^13(x) ^ ROTR^22(x)  (for a)
  let a = (*state)[0];
  let b = (*state)[1];
  let e = (*state)[4];
  
  // Ch(e,f,g): (e & f) ^ (~e & g)
  let ch = (e & (*state)[5]) ^ ((~e) & (*state)[6]);
  
  // Maj(a,b,c): (a & b) ^ (a & c) ^ (b & c)
  let maj = (a & b) ^ (a & (*state)[2]) ^ (b & (*state)[2]);
  
  // Sigma1: ROTR^6(e) ^ ROTR^11(e) ^ ROTR^25(e)
  let sigma1 = ((e >> 6u) | (e << 26u)) ^ ((e >> 11u) | (e << 21u)) ^ ((e >> 25u) | (e << 7u));
  
  // Sigma0 for a
  let sigma0 = ((a >> 2u) | (a << 30u)) ^ ((a >> 13u) | (a << 19u)) ^ ((a >> 22u) | (a << 10u));
  
  let t1 = (*state)[7] + sigma1 + ch + round + msg;
  let t2 = sigma0 + maj;
  
  // Shift state
  for (var i = 7u; i > 0u; i--) {
    (*state)[i] = (*state)[i-1u];
  }
  (*state)[4] = (*state)[4] + t1;
  (*state)[0] = t1 + t2;
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  if (idx >= 1024u) { return; }
  
  // Initialize hash state (SHA-256 IV)
  var state: array<u32, 8> = array(
    0x6a09e667u, 0xbb67ae85u, 0x3c6ef372u, 0xa54ff53au,
    0x510e527fu, 0x9b05688cu, 0x1f83d9abu, 0x5be0cd19u
  );
  
  // Message schedule - simulate real hash input
  var w: array<u32, 64>;
  for (var j = 0u; j < 16u; j++) {
    w[j] = output[(idx * 16u + j) % 1024u] ^ (idx * 2654435761u + j * 2246822519u);
  }
  // Extend message schedule
  for (var j = 16u; j < 64u; j++) {
    let s0 = ((w[j-15u] >> 7u) | (w[j-15u] << 25u)) ^ ((w[j-15u] >> 18u) | (w[j-15u] << 14u)) ^ (w[j-15u] >> 3u);
    let s1 = ((w[j-2u] >> 17u) | (w[j-2u] << 15u)) ^ ((w[j-2u] >> 19u) | (w[j-2u] << 13u)) ^ (w[j-2u] >> 10u);
    w[j] = w[j-16u] + s0 + w[j-7u] + s1;
  }
  
  // Compression rounds - this is the compute-heavy part
  for (var round = 0u; round < 64u; round++) {
    mix(&state, round, w[round]);
  }
  
  // Final: XOR with initial values
  output[idx] = state[0] ^ state[3] ^ state[7] ^ 0x6a09e667u;
  
  // Increment global counter (for measuring total work done)
  atomicAdd(&counter, 1u);
}
`;

// Lightweight benchmark using simpler operations (good for mobile/low-end)
const LIGHT_SHADER = `
@group(0) @binding(0) var<storage, read_write> output: array<u32>;
@group(0) @binding(1) var<storage, read_write> counter: atomic<u32>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let idx = gid.x;
  if (idx >= 1024u) { return; }
  
  var h = output[idx] ^ 0x9e3779b9u;
  for (var i = 0u; i < 32u; i++) {
    h = (h << 7u) | (h >> 25u);
    h ^= 0x6a09e667u ^ i;
    h = (h << 13u) | (h >> 19u);
    h += 0xbb67ae85u ^ (idx * 2654435761u);
    h ^= (h >> 16u);
    h = h * 0x85ebca6bu;
    h ^= (h >> 13u);
    h = h * 0xc2b2ae35u;
    h ^= (h >> 16u);
  }
  
  output[idx] = h;
  atomicAdd(&counter, 1u);
}
`;

export interface BenchmarkResult {
  /** Raw benchmark score (operations/second) */
  rawScore: number;
  /** Detected GPU name */
  gpuName: string;
  /** Estimated PearlHash hashrate in TH/s */
  estimatedPearlHash: number;
  /** Confidence level 0-1 */
  confidence: number;
  /** WebGPU supported */
  supported: boolean;
  /** Error message if failed */
  error?: string;
}

// Reference GPU scores calibrated from our database
// These map raw benchmark operations/s to known PearlHash TH/s
const REFERENCE_GPUS = [
  { name: "RTX 5090", rawOpsPerSec: 980000000, pearlhash: 310, tdp: 575, weight: 1.0 },
  { name: "RTX 5080", rawOpsPerSec: 650000000, pearlhash: 200, tdp: 360, weight: 1.0 },
  { name: "RTX 5070 Ti", rawOpsPerSec: 480000000, pearlhash: 150, tdp: 300, weight: 1.0 },
  { name: "RTX 5070", rawOpsPerSec: 370000000, pearlhash: 115, tdp: 250, weight: 1.0 },
  { name: "RTX 5060 Ti", rawOpsPerSec: 260000000, pearlhash: 82, tdp: 180, weight: 1.0 },
  { name: "RTX 5060", rawOpsPerSec: 200000000, pearlhash: 62, tdp: 150, weight: 1.0 },
  { name: "RTX 4090", rawOpsPerSec: 900000000, pearlhash: 280, tdp: 450, weight: 1.0 },
  { name: "RTX 4080 Super", rawOpsPerSec: 540000000, pearlhash: 168, tdp: 320, weight: 1.0 },
  { name: "RTX 4070 Ti Super", rawOpsPerSec: 420000000, pearlhash: 130, tdp: 285, weight: 1.0 },
  { name: "RTX 4070 Super", rawOpsPerSec: 360000000, pearlhash: 112, tdp: 220, weight: 1.0 },
  { name: "RTX 4060 Ti", rawOpsPerSec: 200000000, pearlhash: 58, tdp: 160, weight: 1.0 },
  { name: "RTX 4060", rawOpsPerSec: 150000000, pearlhash: 42, tdp: 115, weight: 1.0 },
  { name: "RTX 3090 Ti", rawOpsPerSec: 780000000, pearlhash: 240, tdp: 450, weight: 1.0 },
  { name: "RTX 3080 Ti", rawOpsPerSec: 550000000, pearlhash: 170, tdp: 350, weight: 1.0 },
  { name: "RTX 3070 Ti", rawOpsPerSec: 340000000, pearlhash: 105, tdp: 290, weight: 1.0 },
  { name: "RTX 3060 Ti", rawOpsPerSec: 260000000, pearlhash: 78, tdp: 200, weight: 1.0 },
  { name: "RX 7900 XTX", rawOpsPerSec: 620000000, pearlhash: 195, tdp: 355, weight: 1.0 },
  { name: "RX 7800 XT", rawOpsPerSec: 380000000, pearlhash: 118, tdp: 263, weight: 1.0 },
  { name: "RX 6800 XT", rawOpsPerSec: 460000000, pearlhash: 142, tdp: 300, weight: 1.0 },
];

// Algorithm ratios relative to PearlHash (from our database averages)
export const ALGORITHM_RATIOS = [
  { id: "pearlhash", name: "PearlHash", symbol: "PRL", unit: "TH/s", ratio: 1.0, color: "#8b5cf6" },
  { id: "blake3", name: "Blake3", symbol: "ALPH", unit: "GH/s", ratio: 0.016, color: "#3b82f6" },
  { id: "kawpow", name: "KawPow", symbol: "RVN", unit: "MH/s", ratio: 0.00031, color: "#f59e0b" },
  { id: "kheavyhash", name: "kHeavyHash", symbol: "KAS", unit: "GH/s", ratio: 0.022, color: "#10b981" },
  { id: "etchash", name: "Etchash", symbol: "ETC", unit: "MH/s", ratio: 0.00048, color: "#ef4444" },
  { id: "octopus", name: "Octopus", symbol: "CFX", unit: "MH/s", ratio: 0.00036, color: "#06b6d4" },
  { id: "nexapow", name: "NexaPow", symbol: "NEXA", unit: "MH/s", ratio: 0.00084, color: "#ec4899" },
];

export async function runBenchmark(
  onProgress?: (elapsed: number, ops: number) => void
): Promise<BenchmarkResult> {
  if (!navigator.gpu) {
    return {
      rawScore: 0,
      gpuName: "WebGPU Not Supported",
      estimatedPearlHash: 0,
      confidence: 0,
      supported: false,
      error: "WebGPU not supported. Please use Chrome 113+, Edge 113+ or Firefox Nightly.",
    };
  }

  try {
    // Try with high-performance first, then fallback to low-power
    let adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
    if (!adapter) {
      adapter = await navigator.gpu.requestAdapter({ powerPreference: 'low-power' });
    }
    if (!adapter) {
      // WebGPU adapter not available — fall back to WebGL
      return runWebGLBenchmark();
    }

    const device = await adapter.requestDevice();
    
    // Get GPU info
    const gpuName = adapter.info?.description || 
                    adapter.info?.vendor || 
                    "Unknown GPU";
    const vendor = adapter.info?.vendor || "";

    // Use full or light shader based on GPU capabilities
    const useFullBench = !/Intel|Apple|Mali|Adreno/i.test(vendor);
    const shaderCode = useFullBench ? SHADER_CODE : LIGHT_SHADER;

    // Setup buffers
    const BUFFER_SIZE = 1024 * 4; // 1024 u32s
    const dataBuffer = device.createBuffer({
      size: BUFFER_SIZE,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
    });
    
    const counterBuffer = device.createBuffer({
      size: 4, // atomic u32
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
    });

    const readBuffer = device.createBuffer({
      size: counterBuffer.size,
      usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    });

    // Initialize data
    const initialData = new Uint32Array(1024);
    for (let i = 0; i < 1024; i++) {
      initialData[i] = (i * 2654435761) ^ 0x9e3779b9;
    }
    device.queue.writeBuffer(dataBuffer, 0, initialData);
    device.queue.writeBuffer(counterBuffer, 0, new Uint32Array([0]));

    // Create shader module
    const shaderModule = device.createShaderModule({
      code: shaderCode,
    });

    // Create bind group
    const bindGroupLayout = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: "storage" } },
      ],
    });

    const pipelineLayout = device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    });

    const pipeline = device.createComputePipeline({
      layout: pipelineLayout,
      compute: { module: shaderModule, entryPoint: "main" },
    });

    const bindGroup = device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: dataBuffer } },
        { binding: 1, resource: { buffer: counterBuffer } },
      ],
    });

    // Run benchmark in batches
    const BATCH_SIZE = 4; // dispatch count per batch
    const TOTAL_BATCHES = 20; // ~80 dispatches total
    const START_TIME = performance.now();
    const WORKGROUP_COUNT = 4; // 1024 threads / 256 workgroup size

    // Reset counter
    device.queue.writeBuffer(counterBuffer, 0, new Uint32Array([0]));

    const commandEncoder = device.createCommandEncoder();
    
    for (let batch = 0; batch < TOTAL_BATCHES; batch++) {
      for (let d = 0; d < BATCH_SIZE; d++) {
        const pass = commandEncoder.beginComputePass();
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.dispatchWorkgroups(WORKGROUP_COUNT);
        pass.end();
      }
      
      // Every 4 batches, report progress
      if (onProgress && batch % 4 === 0) {
        const elapsed = (performance.now() - START_TIME) / 1000;
        commandEncoder.copyBufferToBuffer(counterBuffer, 0, readBuffer, 0, 4);
        device.queue.submit([commandEncoder.finish()]);
        await readBuffer.mapAsync(GPUMapMode.READ);
        const counterVal = new Uint32Array(readBuffer.getMappedRange())[0];
        readBuffer.unmap();
        onProgress(elapsed, counterVal);
      }
    }

    // Final read
    commandEncoder.copyBufferToBuffer(counterBuffer, 0, readBuffer, 0, 4);
    device.queue.submit([commandEncoder.finish()]);
    
    // Wait for completion
    await device.queue.onSubmittedWorkDone();
    await readBuffer.mapAsync(GPUMapMode.READ);
    const totalOps = new Uint32Array(readBuffer.getMappedRange())[0];
    readBuffer.unmap();
    
    const totalTime = (performance.now() - START_TIME) / 1000;
    const opsPerSecond = totalOps / totalTime;

    // Find closest matching GPU
    let bestMatch = REFERENCE_GPUS[0];
    let bestDiff = Infinity;
    for (const ref of REFERENCE_GPUS) {
      const diff = Math.abs(opsPerSecond - ref.rawOpsPerSec) / ref.rawOpsPerSec;
      if (diff < bestDiff) {
        bestDiff = diff;
        bestMatch = ref;
      }
    }

    // Estimate PearlHash based on closest match + interpolation
    const pearlEstimate = (opsPerSecond / bestMatch.rawOpsPerSec) * bestMatch.pearlhash;
    const confidence = Math.max(0, 1 - bestDiff * 2);

    // Clean up
    dataBuffer.destroy();
    counterBuffer.destroy();
    readBuffer.destroy();
    device.destroy();

    return {
      rawScore: Math.round(opsPerSecond),
      gpuName: gpuName || bestMatch.name,
      estimatedPearlHash: Math.round(pearlEstimate * 10) / 10,
      confidence: Math.round(confidence * 100) / 100,
      supported: true,
    };
  } catch (err: any) {
    return {
      rawScore: 0,
      gpuName: "Benchmark Failed",
      estimatedPearlHash: 0,
      confidence: 0,
      supported: true,
      error: err.message || "Unknown error running GPU benchmark.",
    };
  }
}

// Fallback: WebGL2-based benchmark when WebGPU is not available
export function runWebGLBenchmark(): Promise<BenchmarkResult> {
  return new Promise((resolve) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('webgl2', { powerPreference: 'high-performance' });
      if (!ctx) {
        resolve({
          rawScore: 0,
          gpuName: "WebGL2 Not Supported",
          estimatedPearlHash: 0,
          confidence: 0,
          supported: false,
          error: "No WebGL2 support.",
        });
        return;
      }
      const gl: WebGL2RenderingContext = ctx;

      const renderer = gl.getParameter(gl.RENDERER) || "Unknown GPU";
      
      // Run a simple compute benchmark via rendering
      const startTime = performance.now();
      let frames = 0;
      
      const vsSource = `#version 300 es
        in vec2 a_position;
        void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;
      
      const fsSource = `#version 300 es
        precision highp float;
        uniform vec2 u_resolution;
        out vec4 outColor;
        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;
          float v = 0.0;
          for (int i = 0; i < 1024; i++) {
            v += sin(uv.x * float(i) * 3.14159) * cos(uv.y * float(i) * 2.71828);
            v += tan(uv.x * uv.y * float(i) * 1.61803);
          }
          outColor = vec4(v * 0.1, v * 0.05, v * 0.02, 1.0);
        }`;

      const vs = gl.createShader(gl.VERTEX_SHADER)!;
      gl.shaderSource(vs, vsSource);
      gl.compileShader(vs);
      
      const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(fs, fsSource);
      gl.compileShader(fs);
      
      const program = gl.createProgram()!;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);
      
      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
      
      const posLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      
      const resLoc = gl.getUniformLocation(program, 'u_resolution');
      
      function renderLoop() {
        for (let i = 0; i < 4; i++) {
          gl.uniform2f(resLoc, canvas.width, canvas.height);
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          frames++;
        }
        
        const elapsed = performance.now() - startTime;
        if (elapsed < 3000) {
          requestAnimationFrame(renderLoop);
        } else {
          const opsPerSecond = Math.round(frames * 250000 / (elapsed / 1000));
          
          // Find closest match the same way
          let bestMatch = REFERENCE_GPUS[0];
          let bestDiff = Infinity;
          for (const ref of REFERENCE_GPUS) {
            const diff = Math.abs(opsPerSecond - ref.rawOpsPerSec) / ref.rawOpsPerSec;
            if (diff < bestDiff) { bestDiff = diff; bestMatch = ref; }
          }
          const pearlEstimate = (opsPerSecond / bestMatch.rawOpsPerSec) * bestMatch.pearlhash;
          
          resolve({
            rawScore: opsPerSecond,
            gpuName: renderer,
            estimatedPearlHash: Math.round(pearlEstimate * 10) / 10,
            confidence: Math.max(0, 1 - bestDiff * 2),
            supported: true,
          });
        }
      }
      renderLoop();
    } catch (err: any) {
      resolve({
        rawScore: 0,
        gpuName: "Benchmark Failed",
        estimatedPearlHash: 0,
        confidence: 0,
        supported: false,
        error: err.message,
      });
    }
  });
}
