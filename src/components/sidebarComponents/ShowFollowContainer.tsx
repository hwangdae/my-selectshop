import { getAllFollowList, getFollowingUsers } from "@/api/follow";
import { getAllUsers, getUserWidthFollow } from "@/api/user";
import useLoginUserId from "@/hook/useLoginUserId";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ShowFollowContainer = () => {
  const loginUser = useLoginUserId();
  console.log(loginUser);

  const { data: followList } = useQuery({
    queryKey: ["followaasasasasasa"],
    queryFn: ()=>getFollowingUsers(loginUser),
  });
  console.log(followList)


  console.log(followList);
  return <div></div>;
};

export default ShowFollowContainer;
