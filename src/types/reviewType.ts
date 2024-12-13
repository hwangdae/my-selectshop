import { registerReviewSchema } from "@/validators/review";
import { z } from "zod";
import { PlaceType } from "./placeType";

export interface ReviewType {
  id: string;
  reviewImages: string | null;
  description: string;
  advantages: string[] | null;
  disAdvantages: string[] | null;
  tags: string | null;
  userId: string;
  selectshopId: string;
  shopInfo?: PlaceType | undefined;
}

export interface UploadReviewType {
  id?: string;
  reviewImages: string | null;
  description: string;
  advantages: { value: string }[] | null;
  disAdvantages: { value: string }[] | null;
  tags: string | null;
  userId: string;
  selectshopId: string;
  test: string;
}

export interface NewReviewType {
  selectshopId: string | undefined;
  reviewImages: string | null;
  description: string;
  advantages: string[] | null | undefined;
  disAdvantages: string[] | null | undefined;
  tags: string | null;
  userId: string;
}

export type RegisterReviewInput = z.infer<typeof registerReviewSchema>;
