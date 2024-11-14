export interface PlacesType {
    data: PlaceType[];
  }

export interface PlaceType {
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: number;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: number;
    y: number;
  }

export interface MarkersType {
  position: {
    lat: number;
    lng: number;
  };
}
export interface MyLocationType {
  center : {
    lat : number;
    lng: number;
  },
  errMsg: null;
  isLoading : boolean;
}

export interface PaginationType {
  current: number;
  first: number;
  last: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: (page:number) => void;
  prevPage: (page:number) => void;
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}
