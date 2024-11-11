import { registerReviewSchema } from "@/validators/review";
import { z } from "zod";

export interface ReviewType {
  id:string;
  reviewImages: string | null ;
  description: string;
  visited: boolean;
  good: string;
  notGood: string;
  tags: string | null;
  userId: string;
  selectshopId: string;
}

export interface UploadReviewType {
  files: FileList | null | undefined;
  review: string;
  advantage: { value: string }[];
  disAdvantage: { value: string }[];
  tags: string;
}

export type RegisterReviewInput = z.infer<typeof registerReviewSchema>;
