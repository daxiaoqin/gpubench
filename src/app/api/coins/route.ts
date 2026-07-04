// Static prices fallback — all real-time data is now fetched client-side
import { coins } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  const prices: Record<string, number> = {};
  for (const coin of coins) {
    prices[coin.id] = coin.price;
  }
  return NextResponse.json(prices, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=7200",
    },
  });
}
