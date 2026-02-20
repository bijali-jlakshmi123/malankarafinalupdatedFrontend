"use client";

import { useEffect, useState } from "react";
import { SEO, getPageSEO } from "@/lib/api";

interface MetaSEOProps {
  slug: string;
}

export default function MetaSEO({ slug }: MetaSEOProps) {
  const [seo, setSeo] = useState<SEO | null>(null);

  useEffect(() => {
    async function fetchSEO() {
      const data = await getPageSEO(slug);
      if (data) {
        setSeo(data);
      }
    }
    fetchSEO();
  }, [slug]);

  if (!seo) return null;

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      {seo.canonical && <link rel="canonical" href={seo.canonical} />}
    </>
  );
}
