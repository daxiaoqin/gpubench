// Static network data fallback — real-time data is fetched client-side
import { NextResponse } from "next/server";
import { defaultNetworkData } from "@/lib/networkData";

export const revalidate = 3600; // 1 hour cache

export async function GET() {
  return NextResponse.json(defaultNetworkData, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
