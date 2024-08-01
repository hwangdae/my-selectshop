import { registerLoginSchema, registerSignUpSchema } from "@/validators/auth";
import { z } from "zod";

export interface AuthType {
    email: string;
    password: string;
    checkPassword: string;
    nickName: string;
  }
  
  export type RegisterLoginInput = z.infer<typeof registerLoginSchema>;

  export type RegisterSignUpInput = z.infer<typeof registerSignUpSchema>;
