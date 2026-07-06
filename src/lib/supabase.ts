// Supabase client for browser-side database access
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BenchmarkRow {
  id: number;
  gpu_name: string;
  raw_score: number;
  estimated_pearl_hash: number;
  confidence: number;
  supported: boolean;
  gpu_vendor: string;
  user_agent: string;
  created_at: string;
}

/** Submit a benchmark result */
export async function submitBenchmark(data: {
  gpuName: string;
  rawScore: number;
  estimatedPearlHash: number;
  confidence: number;
  supported: boolean;
  gpuVendor?: string;
}) {
  const { data: record, error } = await supabase
    .from("benchmarks")
    .insert({
      gpu_name: data.gpuName,
      raw_score: data.rawScore,
      estimated_pearl_hash: data.estimatedPearlHash,
      confidence: data.confidence,
      supported: data.supported,
      gpu_vendor: data.gpuVendor || "",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return record as BenchmarkRow;
}

/** Get leaderboard (sorted by estimated_pearl_hash DESC) */
export async function getLeaderboard(limit = 50) {
  const { data, error } = await supabase
    .from("benchmarks")
    .select("*")
    .eq("supported", true)
    .order("estimated_pearl_hash", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data || []) as BenchmarkRow[];
}

/** Get stats */
export async function getStats() {
  const { count: totalSubmissions, error: err1 } = await supabase
    .from("benchmarks")
    .select("*", { count: "exact", head: true });

  const { data: uniqueGpusData, error: err2 } = await supabase
    .from("benchmarks")
    .select("gpu_name")
    .eq("supported", true);

  const { data: aggData, error: err3 } = await supabase
    .from("benchmarks")
    .select("estimated_pearl_hash")
    .eq("supported", true);

  if (err1 || err2 || err3) throw new Error("Failed to fetch stats");

  const uniqueGpus = new Set((uniqueGpusData || []).map((r) => r.gpu_name)).size;
  const hashes = (aggData || []).map((r) => r.estimated_pearl_hash);
  const avgPearlHash = hashes.length > 0
    ? Math.round((hashes.reduce((a, b) => a + b, 0) / hashes.length) * 100) / 100
    : 0;
  const topPearlHash = hashes.length > 0 ? Math.max(...hashes) : 0;

  return {
    totalSubmissions: totalSubmissions ?? 0,
    uniqueGpus,
    avgPearlHash,
    topPearlHash,
  };
}
