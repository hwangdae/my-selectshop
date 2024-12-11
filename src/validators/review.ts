import { z } from "zod";

export const registerReviewSchema = z.object({
  reviewImages: z.array(z.string()).nullable().optional(), //null or undefiend
  description: z.string().min(1, { message: "리뷰를 적어주세요." }),
  advantages: z.array(z.object({value:z.string().min(1,{message:"장점을 적어주세요."})})),
  disAdvantages: z.array(z.object({value:z.string().min(1,{message:"단점을 적어주세요."})})),
  tags: z.string().optional(), //undefiend 표현, 있을수도 없을수도 있다.
});
