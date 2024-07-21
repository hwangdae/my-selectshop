import { z } from "zod";

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

export const registerSchema = z.object({
  email: z.string().email("이메일 형식을 입력해주세요."),
  password: z
    .string()
    .min(8, { message: "8자리 이상 입력해주세요." })
    .max(15, { message: "15자리 이하로 입력해주세요." })
    .refine(
      (value) => PASSWORD_REGEX.test(value),
      "영문, 숫자, 특수문자를 포함해야 합니다."
    ),
  checkPassword: z
    .string()
    .min(8, { message: "8자리 이상 입력해주세요." })
    .max(15, { message: "15자리 이하로 입력해주세요." })
    .refine(
      (value) => PASSWORD_REGEX.test(value),
      "영문, 숫자, 특수문자를 포함해야 합니다."
    ),
    nickName:z.string().min(3,{message:"3자리 이상 입력해주세요."}).max(6,{message:"6자리 이하로 입력해주세요."})
}).refine((passwordConfirm)=> passwordConfirm.password === passwordConfirm.checkPassword,{
  message:'비밀번호가 일치하지 않습니다.',
  path:['checkPassword']
})
