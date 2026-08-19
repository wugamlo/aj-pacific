import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const routes = [
  "/",
  "/services",
  "/services/education",
  "/services/ai",
  "/services/ai/where-ai-helps",
  "/services/controlling",
  "/explore",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.7,
  }));
}
