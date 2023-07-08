import { getAllVideos } from "@/app/lib/videos";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const videos = await getAllVideos();
    return NextResponse.json(videos);
  } catch (error) {
    console.log(error);
  }
}
