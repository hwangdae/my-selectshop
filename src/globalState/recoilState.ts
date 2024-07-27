import { atom } from "recoil";

export interface Shop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface User {
  id :string;
  created_at : string;
  email :string;
  nickName : string;
}

export const selectShopsState = atom<any[]>({
  key: "selectShopsState",
  default: [],
});

export const userState = atom<User | null>({
  key : "userState",
  default : null,
})