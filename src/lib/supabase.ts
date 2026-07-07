// Supabase client for browser-side database access
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://vgodkxdrrekqbezwhtqr.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnb2RreGRycmVrcWJlendodHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMTI3NTMsImV4cCI6MjA5ODg4ODc1M30._YIoxjlRsc87rgIQFME9HYKyEd3r-ZUIk9rOaVOVAn0";

const missingCredentials = !supabaseUrl || !supabaseAnonKey;

if (missingCredentials) {
  console.warn(
    "Supabase credentials missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

// Lazy client — only created when first accessed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabase: any = null;
function getSupabase() {
  if (!_supabase) {
    if (missingCredentials) {
      throw new Error(
        "Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
    }
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

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
  const supabase = getSupabase();
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
  const supabase = getSupabase();
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
  const supabase = getSupabase();
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

  const uniqueGpus = new Set((uniqueGpusData || []).map((r: Record<string, unknown>) => r.gpu_name as string)).size;
  const hashes = (aggData || []).map((r: Record<string, unknown>) => r.estimated_pearl_hash as number);
  const avgPearlHash = hashes.length > 0
    ? Math.round((hashes.reduce((a: number, b: number) => a + b, 0) / hashes.length) * 100) / 100
    : 0;
  const topPearlHash = hashes.length > 0 ? Math.max(...hashes) : 0;

  return {
    totalSubmissions: totalSubmissions ?? 0,
    uniqueGpus,
    avgPearlHash,
    topPearlHash,
  };
}
