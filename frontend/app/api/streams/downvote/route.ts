import prisma from "@/lib/db";
import { UpvoteStreamSchema } from "@/lib/schemas";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const sessison = await getServerSession();

  const user = await prisma.user.findFirst({
    where: {
      email: sessison?.user?.email || "",
    },
  });

  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const data = UpvoteStreamSchema.parse(await req.json());
    await prisma.upvote.delete({
      where: {
        userId_streamId: {
          streamId: data.streamId,
          userId: user.id,
        },
      },
    });
    return new Response("Upvoted", { status: 200 });
  } catch (error) {
    return new Response("Invalid request", { status: 400 });
  }
}
