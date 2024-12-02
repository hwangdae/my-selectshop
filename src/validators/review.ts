import { z } from "zod";

export const registerReviewSchema = z.object({
  reviewImages: z.array(z.string()).nullable().optional(), //null or undefiend
  description: z.string().min(1, { message: "리뷰를 적어주세요." }),
  advantages: z.array(z.object({value:z.string()})).optional(),
  disAdvantages: z.array(z.object({value:z.string()})).optional(),
  // disAdvantages: z.array(z.object({ value: z.string() })),
  tags: z.string().optional(), //undefiend 표현, 있을수도 없을수도 있다.
});
