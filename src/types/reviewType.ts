import { registerReviewSchema } from "@/validators/review";
import { z } from "zod";

export interface ReviewType {
    id :string;
    reviewImages : string;
    description : string;
    visited : boolean;
    good : string;
    notGood :string;
    tags : string;
    userId : string;
    selectshopId : string
  }

  export type RegisterReviewInput = z.infer<typeof registerReviewSchema>;