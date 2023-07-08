import { getVideoById } from "@/app/lib/videos";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const videoId = req.nextUrl.searchParams.get("videoId");
    const video = await getVideoById(videoId as string);

    return NextResponse.json(video);
  } catch (error) {
    console.log(error);
  }
}
