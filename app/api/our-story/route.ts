import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiImageUrl } from "@/lib/strapi";

export const dynamic = "force-dynamic"; // Prevent Next.js from caching this route

export async function GET() {
  try {
    const data = await fetchStrapi("our-story", "populate=*");

    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json({
      id: data.id,
      title: data.title,
      subtitle: data.subtitle,
      mainContent: data.mainContent,
      sideContent: data.sideContent,
      videoUrl: data.videoUrl,
      images:
        data.images
          ?.map((img: any) => ({ url: getStrapiImageUrl(img.url) }))
          .filter((img: any) => img.url) || [],
      detailedStoryTitle: data.detailedStoryTitle,
      detailedStory: data.detailedStory,
      narrativeTitle: data.narrativeTitle,
      narrativeContent: data.narrativeContent,
    });
  } catch (error) {
    console.error("[API] our-story GET error:", error);
    return NextResponse.json(
      { error: "Failed to load our story" },
      { status: 500 },
    );
  }
}
