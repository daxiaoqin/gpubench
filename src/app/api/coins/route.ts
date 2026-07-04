// This file is intentionally minimal for static export.
// All real-time data is fetched client-side.
export const dynamic = "force-static";

export async function GET() {
  return Response.json({});
}
