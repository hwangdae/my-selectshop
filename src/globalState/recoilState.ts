import { atom } from "recoil";

export interface Shop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export const selectShopsState = atom<any[]>({
  key: "selectShopsState",
  default: [],
});