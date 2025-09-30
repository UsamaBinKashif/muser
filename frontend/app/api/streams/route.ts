import prisma from "@/lib/db";
import { CreateStreamSchema } from "@/utils/schema.zod";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const extractedId = data.url.split("=").at(-1) as string;

    const stream = await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        streamType: "YouTube",
      },
    });

    return NextResponse.json(stream, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.issues }, { status: 400 });
    }
    return NextResponse.json({ message: "Invalid data" }, { status: 411 });
  }
}
