import { NextResponse } from "next/server";
import { fetchStrapi } from "@/lib/strapi";

export async function GET() {
  try {
    const data = await fetchStrapi("terms-conditions-page", "populate=*");

    if (!data) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(
      {
        id: data.id,
        title: data.title,
        content: data.content,
        sections: data.sections,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API] terms-conditions-page GET error:", error);
    return NextResponse.json(
      { error: "Failed to load terms & conditions" },
      { status: 500 },
    );
  }
}
