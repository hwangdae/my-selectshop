import { registerReviewSchema } from "@/validators/review";
import { z } from "zod";

export interface ReviewType {
    id :string;
    reviewImages : string | null;
    description : string;
    visited : boolean;
    good : string;
    notGood :string;
    tags : string | null;
    userId : string;
    selectshopId : string;
    users : {
      nickName : string;
      profileImage : string;
    }
  }

  export type RegisterReviewInput = z.infer<typeof registerReviewSchema>;