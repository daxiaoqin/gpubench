"use client";

import { useEffect, useState, useRef } from "react";

export default function GPUBenchmarkPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fps, setFps] = useState(0);
  const [minFps, setMinFps] = useState(Infinity);
  const [avgFps, setAvgFps] = useState(0);
  const [objectCount, setObjectCount] = useState(500);
  const [status, setStatus] = useState("Initializing...");
  const [gpuInfo, setGpuInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    let animationId: number;
    let frameCount = 0;
    let lastTime = performance.now();
    let totalFps = 0;
    let fpsSampleCount = 0;
    let minFps = Infinity;
    let objects: Float32Array;
    let canvas: HTMLCanvasElement | null = null;
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;

    // Initialize WebGL
    canvas = canvasRef.current;
    if (!canvas) {
      setStatus("Canvas not available");
      return;
    }

    gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      setStatus("WebGL not supported");
      return;
    }
    // Safe aliases for closure narrowing
    const sGl: WebGLRenderingContext = gl;
    const sCanvas: HTMLCanvasElement = canvas;

    // Get GPU info
    const debugInfo = sGl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const vendor = sGl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      const renderer = sGl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      setGpuInfo({ vendor, renderer });
    }

    // Simple vertex shader
    const vertexShaderSource = `
      attribute vec3 aPosition;
      attribute vec3 aColor;
      varying vec3 vColor;
      void main() {
        vColor = aColor;
        gl_Position = vec4(aPosition, 1.0);
      }
    `;

    // Simple fragment shader
    const fragmentShaderSource = `
      precision mediump float;
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
    `;

    // Compile shader
    function compileShader(glCtx: WebGLRenderingContext, source: string, type: number): WebGLShader | null {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error("Shader compile error:", glCtx.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(sGl, vertexShaderSource, sGl.VERTEX_SHADER);
    const fragmentShader = compileShader(sGl, fragmentShaderSource, sGl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      setStatus("Failed to compile shaders");
      return;
    }

    // Create program
    const program = sGl.createProgram();
    if (!program) return;
    sGl.attachShader(program, vertexShader);
    sGl.attachShader(program, fragmentShader);
    sGl.linkProgram(program);
    if (!sGl.getProgramParameter(program, sGl.LINK_STATUS)) {
      setStatus("Failed to link program");
      return;
    }
    sGl.useProgram(program);

    // Create geometry (cube)
    const positions = new Float32Array([
      -1, -1,  1,   1, -1,  1,   1,  1,  1,  -1,  1,  1,
      -1, -1, -1,  -1,  1, -1,   1,  1, -1,   1, -1, -1,
      -1,  1, -1,  -1,  1,  1,   1,  1,  1,   1,  1, -1,
      -1, -1, -1,   1, -1, -1,   1, -1,  1,  -1, -1,  1,
      1, -1, -1,   1,  1, -1,   1,  1,  1,   1, -1,  1,
      -1, -1, -1,  -1, -1,  1,  -1,  1,  1,  -1,  1, -1,
    ]);

    const colors = new Float32Array([
      1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0,
      0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0,
      0, 0, 1,  0, 0, 1,  0, 0, 1,  0, 0, 1,
      1, 1, 0,  1, 1, 0,  1, 1, 0,  1, 1, 0,
      0, 1, 1,  0, 1, 1,  0, 1, 1,  0, 1, 1,
      1, 0, 1,  1, 0, 1,  1, 0, 1,  1, 0, 1,
    ]);

    const positionBuffer = sGl.createBuffer();
    sGl.bindBuffer(sGl.ARRAY_BUFFER, positionBuffer);
    sGl.bufferData(sGl.ARRAY_BUFFER, positions, sGl.STATIC_DRAW);

    const colorBuffer = sGl.createBuffer();
    sGl.bindBuffer(sGl.ARRAY_BUFFER, colorBuffer);
    sGl.bufferData(sGl.ARRAY_BUFFER, colors, sGl.STATIC_DRAW);

    const positionLoc = sGl.getAttribLocation(program, "aPosition");
    sGl.enableVertexAttribArray(positionLoc);
    sGl.vertexAttribPointer(positionLoc, 3, sGl.FLOAT, false, 0, 0);

    const colorLoc = sGl.getAttribLocation(program, "aColor");
    sGl.enableVertexAttribArray(colorLoc);
    sGl.vertexAttribPointer(colorLoc, 3, sGl.FLOAT, false, 0, 0);

    // Create cubes
    function createCubes(count: number) {
      const data = new Float32Array(count * 24 * 3);
      for (let i = 0; i < count; i++) {
        const offset = i * 24 * 3;
        for (let j = 0; j < 24; j++) {
          data[offset + j] = positions[j];
        }
      }
      return data;
    }

    objects = createCubes(objectCount);
    const objectBuffer = sGl.createBuffer();
    sGl.bindBuffer(sGl.ARRAY_BUFFER, objectBuffer);
    sGl.bufferData(sGl.ARRAY_BUFFER, objects, sGl.STATIC_DRAW);

    // Resize handler
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const width = sCanvas.clientWidth * dpr;
      const height = sCanvas.clientHeight * dpr;
      sCanvas.width = width;
      sCanvas.height = height;
      sGl.viewport(0, 0, width, height);
    }

    // Safety check before using canvas
    if (!canvas) return;

    window.addEventListener("resize", resize);
    resize();

    // Animation loop
    function animate(time: number) {
      frameCount++;
      const delta = time - lastTime;
      lastTime = time;

      if (delta >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / delta);
        setFps(currentFps);
        totalFps += currentFps;
        fpsSampleCount++;
        setAvgFps(Math.round(totalFps / fpsSampleCount));

        if (currentFps < minFps) {
          minFps = currentFps;
          setMinFps(minFps);
        }

        setStatus(`Rendering ${objectCount} cubes... FPS: ${currentFps}`);

        frameCount = 0;
      }

      // Clear
      sGl.clearColor(0.1, 0.1, 0.1, 1.0);
      sGl.clear(sGl.COLOR_BUFFER_BIT);

      // Set up projection
      const aspect = sCanvas.width / sCanvas.height;
      const progLoc = sGl.getUniformLocation(program!, "projection");
      sGl.uniformMatrix4fv(progLoc!, false,
        new Float32Array([
          1, 0, 0, 0,
          0, aspect, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
        ])
      );

      // Rotate and draw cubes
      const rotation = time * 0.001;
      for (let i = 0; i < objectCount; i++) {
        const offset = i * 24 * 3;
        sGl.bindBuffer(sGl.ARRAY_BUFFER, objectBuffer);
        sGl.bufferData(sGl.ARRAY_BUFFER, objects.slice(offset, offset + 72), sGl.STATIC_DRAW);

        const x = (i % 20 - 10) * 0.5;
        const y = Math.floor(i / 20) * 0.5 - 5;
        const z = Math.floor(i / 400) * 0.5 - 2;

        const cos = Math.cos(rotation + i * 0.01);
        const sin = Math.sin(rotation + i * 0.01);

        const mvLoc = sGl.getUniformLocation(program!, "modelView");
        sGl.uniformMatrix4fv(mvLoc!, false,
          new Float32Array([
            cos, 0, sin, 0,
            0, 1, 0, 0,
            -sin, 0, cos, 0,
            x, y, z, 1,
          ])
        );

        sGl.drawArrays(sGl.TRIANGLES, 0, 24);
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [objectCount]);

  const handleAddObjects = () => {
    setObjectCount((prev) => prev + 500);
  };

  const handleRemoveObjects = () => {
    setObjectCount((prev) => Math.max(100, prev - 500));
  };

  return (
    <div className="min-h-screen bg-[--bg-secondary] text-[--text-primary] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">GPU Stress Test</h1>
        <p className="text-[--text-muted] mb-8">
          Test your graphics card performance in real time. Observe FPS, minimum and average values.
          Click anywhere to add more objects.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-[--bg-primary] rounded-lg overflow-hidden shadow-lg">
              <canvas ref={canvasRef} className="w-full" style={{ height: "500px" }} />
            </div>

            {/* Controls */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleRemoveObjects}
                className="px-4 py-2 bg-[--accent-red] hover:bg-[--accent-red-hover] rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={objectCount <= 100}
              >
                Remove 500 Objects
              </button>
              <button
                onClick={handleAddObjects}
                className="px-4 py-2 bg-[--accent-green] hover:bg-[--accent-green-hover] rounded-lg font-semibold transition-colors"
              >
                Add 500 Objects
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="bg-[--bg-primary] rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[--text-muted]">Current FPS</div>
                  <div className="text-4xl font-bold text-[--accent-green]">{fps}</div>
                </div>
                <div>
                  <div className="text-sm text-[--text-muted]">Average FPS</div>
                  <div className="text-2xl font-bold">{avgFps}</div>
                </div>
                <div>
                  <div className="text-sm text-[--text-muted]">Minimum FPS</div>
                  <div className="text-2xl font-bold text-[--accent-red]">{minFps === Infinity ? "N/A" : minFps}</div>
                </div>
                <div>
                  <div className="text-sm text-[--text-muted]">Objects</div>
                  <div className="text-2xl font-bold">{objectCount}</div>
                </div>
              </div>
            </div>

            {Object.keys(gpuInfo).length > 0 && (
              <div className="bg-[--bg-primary] rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">GPU Info</h2>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-[--text-muted]">Vendor</div>
                    <div className="font-mono">{gpuInfo.vendor}</div>
                  </div>
                  <div>
                    <div className="text-[--text-muted]">Renderer</div>
                    <div className="font-mono">{gpuInfo.renderer}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[--bg-primary] rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Status</h2>
              <p className="text-[--text-muted]">{status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
