import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
