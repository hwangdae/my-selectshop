import { z } from "zod";

export const registerReviewSchema = z.object({
  file: z.instanceof(File).nullable().optional(), //null or undefiend
  review: z.string().min(1, { message: "리뷰를 적어주세요." }),
//   advantage: z.array(z.object({ value: z.string().min(1) })),
//   disAdvantage: z.array(z.object({ value: z.string().min(1) })),
  brand: z.string().optional(), //undefiend 표현, 있을수도 없을수도 있다.
});
