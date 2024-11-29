import { z } from "zod";

export const registerReviewSchema = z.object({
  reviewImages: z.instanceof(File).nullable().optional(), //null or undefiend
  description: z.string().min(1, { message: "리뷰를 적어주세요." }),
  test:z.string().optional(),
  advantages: z.array(z.object({ value: z.string() })),
  disAdvantages: z.array(z.object({ value: z.string() })),
  tags: z.string().optional(), //undefiend 표현, 있을수도 없을수도 있다.
});
