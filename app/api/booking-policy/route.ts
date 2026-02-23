import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export async function GET() {
  try {
    const data = await fetchStrapi("booking-policy-page", "populate=*");

    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(
      {
        id: data.id,
        title: data.title,
        policies: data.policies,
        image: data.image?.url
          ? { url: getStrapiImageUrl(data.image.url) }
          : null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] booking-policy-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load booking policy" },
      { status: 500 },
    );
  }
}
