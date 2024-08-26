import { MarkersType, PlaceType } from "@/types/placeType";
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

export const selectShopsState = atom<PlaceType[]>({
  key: "selectShopsState",
  default: [],
});

export const userState = atom<User | null>({
  key : "userState",
  default : null,
})

export const mapState = atom<any>({
  key:"mapState",
  default : null
})

export interface MyLocationType {
  center : {
    lat : number;
    lng: number;
  },
  errMsg: null;
  isLoading : boolean;
}
export const myLocationState = atom<MyLocationType>({
  key : "myLocationState",
  default : {
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  }
})

export const markersState = atom<MarkersType[]>({
  key : "markersState",
  default : []
})