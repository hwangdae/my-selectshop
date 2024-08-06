import {
  addSelectShopBookmark,
  deleteSelectShopBookmark,
  getSelectShopBookmark,
} from "@/api/selectShopBookmark";
import { styleColor } from "@/styles/styleColor";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Star from "@/assets/Star.svg";
import useLoginUserId from "@/hook/useLoginUserId";
import { useQuery } from "@tanstack/react-query";
interface PropsType {
  id: string;
}
const SelectShopBookmark = ({ id }: PropsType) => {
  const [favoritesToggle, setFavoritesToggle] = useState<boolean>(false);
  const loginUser = useLoginUserId();
  const { data: selectShopData } = useQuery({
    queryKey: ["selectShop_bookmark", id],
    queryFn: () => getSelectShopBookmark(id),
  });
  useEffect(() => {
    if (selectShopData && loginUser) {
      const isBookmarked = selectShopData.some(
        (bookmark) =>
          bookmark.selectShopId === id && bookmark.userId === loginUser
      );
      setFavoritesToggle(isBookmarked);
    }
  }, [selectShopData, loginUser, id]);

  const favoritesButtonHandler = async () => {
    if (!loginUser) {
      alert("로그인이 필요한 서비스 입니다.");
      return;
    }
    if (!favoritesToggle) {
      const newSelectShopBookmark = {
        selectShopId: id,
        userId: loginUser,
      };
      addSelectShopBookmark(newSelectShopBookmark);
      setFavoritesToggle(true);
    } else {
      deleteSelectShopBookmark(id, loginUser);
      setFavoritesToggle(false);
    }
  };

  return (
    <S.SelectshopFavoritesButton onClick={favoritesButtonHandler}>
      <Star fill={favoritesToggle ? `${styleColor.BROWN[0]}` : "current"} />
    </S.SelectshopFavoritesButton>
  );
};

export default SelectShopBookmark;

const S = {
  SelectshopFavoritesButton: styled.button`
    cursor: pointer;
  `,
};
