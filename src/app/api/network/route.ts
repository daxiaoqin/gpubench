// Static network data fallback — all real-time data is now fetched client-side
import { NextResponse } from "next/server";
import { defaultNetworkData } from "@/lib/networkData";

export async function GET() {
  return NextResponse.json(defaultNetworkData, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=7200",
    },
  });
}
