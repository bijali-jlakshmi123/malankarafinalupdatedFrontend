export const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";

export async function fetchStrapi(endpoint: string, query: string = "") {
  const url = `${STRAPI_URL}/api/${endpoint}${query ? `?${query}&` : "?"}t=${Date.now()}`;
  console.log(`[Strapi] Fetching: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Always fetch fresh data from Strapi
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[Strapi] Error fetching ${endpoint}:`,
        response.status,
        errorText,
      );
      return null;
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(`[Strapi] Network error fetching ${endpoint}:`, error);
    return null;
  }
}

export function getStrapiImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
