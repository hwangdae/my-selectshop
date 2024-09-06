import { z } from "zod";

export const registerReviewSchema = z.object({
  file: z.instanceof(File).nullable().optional(),
  review: z.string().min(1, { message: "리뷰를 적어주세요." }),
  advantage: z.array(z.object({ value: z.string().min(1) })),
  disAdvantage: z.array(z.object({ value: z.string().min(1) })),
  brand: z.string().optional(),
});
