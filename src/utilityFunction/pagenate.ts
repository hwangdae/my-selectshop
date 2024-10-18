import { PlaceType } from "@/types/placeType";

export const getPaginatedItems = (items:PlaceType[],currentPage:number) => {
    const indexOfLastItem = currentPage * 15;
    const indexOfFirstItem = indexOfLastItem - 15;
    const currentItems = items.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    return currentItems
}