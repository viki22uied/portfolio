import { NextRequest, NextResponse } from "next/server";

/**
 * Best-effort, edge-level rate limiter (Next 16 "proxy" convention).
 *
 * IMPORTANT — honest scope:
 *  - This site is statically generated and fronted by Netlify's CDN, which is the
 *    *primary* line of defense against volumetric DDoS. A reverse proxy / CDN is the
 *    only thing that can absorb a true distributed flood.
 *  - This runs in the Edge runtime. Its counter (`buckets`) lives in the memory of a
 *    single edge isolate, so it can only throttle a burst that reuses the same isolate.
 *    It meaningfully blocks naive single-source request floods and scrapers, and returns
 *    a proper 429, but it is NOT a substitute for CDN-level protection. Treat it as a
 *    cheap extra layer, not the whole shield.
 */

const WINDOW_MS = 10_000; // 10s sliding window
const MAX_REQUESTS = 60; // generous for a human navigating; trips on automated floods
const MAX_TRACKED_IPS = 10_000; // cap memory

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || req.headers.get("x-nf-client-connection-ip") || "unknown";
}

export function proxy(req: NextRequest) {
  const ip = clientIp(req);
  const now = Date.now();

  let bucket = buckets.get(ip);
  if (!bucket || now > bucket.reset) {
    bucket = { count: 0, reset: now + WINDOW_MS };
    buckets.set(ip, bucket);
  }
  bucket.count += 1;

  // Opportunistic cleanup so the map can't grow unbounded.
  if (buckets.size > MAX_TRACKED_IPS) {
    for (const [key, value] of buckets) {
      if (now > value.reset) buckets.delete(key);
    }
  }

  if (bucket.count > MAX_REQUESTS) {
    const retryAfter = Math.max(1, Math.ceil((bucket.reset - now) / 1000));
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
        "Content-Type": "text/plain",
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.next();
}

/**
 * Only guard navigable document requests. Static assets, the image optimizer,
 * and files with extensions are excluded so we never add latency to /_next/* etc.
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
