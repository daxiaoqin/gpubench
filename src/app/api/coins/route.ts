// Static price fallback — real-time prices are fetched client-side
import { coins } from "@/lib/data";
import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour cache

export async function GET() {
  const prices: Record<string, number> = {};
  for (const coin of coins) {
    prices[coin.id] = coin.price;
  }
  return NextResponse.json(prices, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
