import { getVideoById } from "@/app/lib/videos";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");
    const video = await getVideoById(videoId as string);

    return NextResponse.json(video);
  } catch (error) {
    console.log(error);
  }
}
export const dynamic = "force-dynamic";
