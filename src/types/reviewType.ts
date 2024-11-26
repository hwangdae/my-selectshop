import { registerReviewSchema } from "@/validators/review";
import { z } from "zod";
import { PlaceType } from "./placeType";

export interface ReviewType {
  id:string;
  reviewImages: string | null ;
  description: string;
  visited: boolean;
  advantage: string;
  disAdvantage: string;
  tags: string | null;
  userId: string;
  selectshopId: string;
  shopInfo? : PlaceType | undefined;
}

export interface UploadReviewType {
  selectshopId : string;
  reviewImages: FileList | null | undefined;
  description: string;
  advantage: { value: string }[];
  disAdvantage: { value: string }[];
  tags: string;
  userId : string;
}

export interface NewReviewType {
  selectshopId : string;
  reviewImages: string | null;
  description: string;
  advantage: string
  disAdvantage: string
  tags: string;
  userId : string;
}

export type RegisterReviewInput = z.infer<typeof registerReviewSchema>;
