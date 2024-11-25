import { registerLoginSchema, registerSignUpSchema } from "@/validators/auth";
import { z } from "zod";
import { ReviewType } from "./reviewType";

export interface AuthType {
  id:string;
  email: string;
  password: string;
  checkPassword: string;
  nickName: string;
}

export interface UserType {
  id :string;
  created_at : string;
  email :string;
  nickName : string;
  profileImage : string;
  filteredReviewCount ? : number
  reviews ? : ReviewType[]
}

export interface updateProfileType {
  profileImage: string | undefined;
  nickName: string;
}

export type RegisterLoginInput = z.infer<typeof registerLoginSchema>;

export type RegisterSignUpInput = z.infer<typeof registerSignUpSchema>;
