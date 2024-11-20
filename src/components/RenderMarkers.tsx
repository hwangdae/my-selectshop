import { getAllReview } from "@/api/review";
import {
  currentPageState,
  searchTermState,
  selectShopsState,
  shopCoordinatesState,
} from "@/globalState/recoilState";
import { PlaceType } from "@/types/placeType";
import { ReviewType } from "@/types/reviewType";
import { getPaginatedItems } from "@/utilityFunction/pagenate";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import React from "react";
import MarkerContainer from "./MarkerContainer";

const RenderMarkers = () => {
  const selectshops = useRecoilValue(selectShopsState);
  const searchTerm = useRecoilValue(searchTermState);
  const currentPage = useRecoilValue<number>(currentPageState);
  const shopCoordinates = useRecoilValue(shopCoordinatesState);

  const router = useRouter();
  const { tab } = router.query;

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => getAllReview(),
    refetchOnWindowFocus: false,
  });

  const filteredShops = selectshops.filter((selectshop) =>
    selectshop.place_name.includes(searchTerm)
  );

  const visitedSelectshops = selectshops?.filter(
    (selectshop: PlaceType) =>
      reviewData?.some(
        (review: ReviewType) => review.selectshopId === selectshop.id
      ) && selectshop.place_name.includes(searchTerm)
  );

  const notVisitedSelectshops = selectshops?.filter(
    (selectshop: PlaceType) =>
      !reviewData?.some(
        (review: ReviewType) => review.selectshopId === selectshop.id
      ) && selectshop.place_name.includes(searchTerm)
  );

  const renderContent = () => {
    if (tab === "nearbySelectshop") {
      return filteredShops;
    } else if (tab === "visitedSelectshop") {
      return getPaginatedItems(visitedSelectshops, currentPage);
    } else if (tab === "notVisiteSelectshop") {
      return getPaginatedItems(notVisitedSelectshops, currentPage);
    } else if(tab === "bestReviewer") {
      return shopCoordinates;
    } else {
      return []
    }
  };

  return (
    <>
      {renderContent().map((selectshop, index) => (
        <MarkerContainer selectshop={selectshop} index={index} />
      ))}
    </>
  );
};

export default RenderMarkers;
