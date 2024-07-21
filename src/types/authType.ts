import { registerSchema } from "@/validators/auth";
import { z } from "zod";

export interface AuthType {
    email: string;
    password: string;
    checkPassword: string;
    nickName: string;
  }
  
  export type RegisterInput = z.infer<typeof registerSchema>;