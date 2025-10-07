import prisma from "@/lib/db";
import { CreateStreamSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { GetVideoDetails } from "youtube-search-api";

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());

    const urlObj = new URL(data.url);
    const extractedId = urlObj.searchParams.get("v");

    if (!extractedId) {
      return NextResponse.json(
        {
          message: "Invalid data",
          error: "Invalid YouTube URL: missing video ID",
        },
        { status: 400 }
      );
    }
    const videoDetails = await GetVideoDetails(extractedId);
    const stream = await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        title: videoDetails.title || "",
        thumbnail_sm: videoDetails.thumbnail?.thumbnails?.[0]?.url || "",
        thumbnail_lg: videoDetails.thumbnail?.thumbnails?.at(-1)?.url || "",
        extractedId,
        streamType: "YouTube",
      },
    });

    return NextResponse.json(stream, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid data", error: String(error) },
      { status: 400 }
    );
  }
}

export const GET = async (req: NextRequest) => {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prisma.stream.findMany({
    where: {
      userId: creatorId || undefined,
    },
  });
  return NextResponse.json(streams, { status: 200 });
};
