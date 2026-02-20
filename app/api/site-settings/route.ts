import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export async function GET() {
  try {
    const settings = await fetchStrapi("site-setting", "populate=*");

    if (!settings) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(
      {
        id: settings.id,
        documentId: settings.documentId,
        siteName: settings.siteName,
        siteTagline: settings.siteTagline,
        bookNowUrl: settings.bookNowUrl ?? undefined,
        whatsappNumber: settings.whatsappNumber ?? undefined,
        logo: settings.logo?.url
          ? { url: getStrapiImageUrl(settings.logo.url) }
          : undefined,
        phoneNumbers:
          typeof settings.phoneNumbers === "string"
            ? settings.phoneNumbers.split(",").map((p: string) => p.trim())
            : settings.phoneNumbers,
        address: settings.address,
        email: settings.email,
        socialLinks: settings.socialLinks,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] site-settings GET error:", error);
    return NextResponse.json(
      { error: "Failed to load site settings" },
      { status: 500 },
    );
  }
}
