import z from "zod";

export const CreateStreamSchema = z.object({
  creatorId: z.string().uuid(), 
  url: z
    .string()
    .url()
    .refine((val) => val.includes("youtube.com/watch?v="), {
      message: "URL must be a valid YouTube video link",
    }),
});
