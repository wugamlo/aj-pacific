import type { Metadata } from "next";

/** Canonical production origin for SEO (sitemap, OG, canonicals). */
export const SITE_URL = "https://aj-pacific.com";

export const SITE_NAME = "AJ Pacific";

export const DEFAULT_OG_IMAGE = "/images/banner1024x576.jpg";

export const DEFAULT_DESCRIPTION =
  "Practical AI education, consulting, and controlling from Hong Kong. Orientation, opportunity assessment, automation, and financial clarity for small and mid-sized organisations.";

export function absoluteUrl(path: string = "/"): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Page-level metadata with canonical + minimal Open Graph. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  /** When true, use title as-is (home). Otherwise document title uses root template. */
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      type: "website",
      url,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_OG_IMAGE }],
    },
  };
}
