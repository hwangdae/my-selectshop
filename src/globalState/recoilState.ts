import { MarkersType, MyLocationType, PlaceType } from "@/types/placeType";
import { User } from "@supabase/supabase-js";
import { atom } from "recoil";

export const selectShopsState = atom<PlaceType[]>({
  key: "selectShopsState",
  default: [],
});

export const shopCoordinatesState = atom<PlaceType[]>({
  key : "shopCoordinatesState",
  default : []
})

export const userState = atom<User | null>({
  key : "userState",
  default : null,
})

export const mapState = atom<any>({
  key:"mapState",
  default : null
})

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

export const myAddressState = atom<string>({
  key : "myAddressState",
  default : ""
})

export const markersState = atom<MarkersType[]>({
  key : "markersState",
  default : []
})

export const reviewState = atom({
  key : 'reviewState',
  default :null
})

export const boundsState = atom ({
  key : 'boundsState',
  default : null
})

export const currentPageState = atom ({
  key : 'currentPageState',
  default : 1
})

export const searchTermState = atom<string>({
  key: "searchTermState",
  default: "",
});

export const showFollowState = atom<boolean>({
  key : "showFollowState",
  default:false
})