import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

const WriteReview = () => {
    
  const router = useRouter()
  const {id} = router.query
  const {register,handleSubmit} = useForm({defaultValues:{
    file: null,
    review : "",
    advantage : "",
    disAdvantage : "",
    brand : "",
  }})

  const addReviewSubmit = async({file,review,advantage,disAdvantage,brand}:any) => {
    const newReview = {
      selectshopId : id,
      reviewImages : file,
      description : review,
      visited : true,
      good : advantage,
      notGood : disAdvantage,
      tags:brand
    }
    await supabase.from('review').insert(newReview)
    alert('작성이 완료 되었습니다.')
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit(addReviewSubmit)}>
        <div>
          <h1>후기 등록하기</h1>
          <button type="submit">저장</button>
        </div>
        <ul>
          <li>
            <label htmlFor="file-upload"></label>
            <input id="file-upload" type="file" {...register("file")}></input>
          </li>
          <li>
            <label htmlFor="review">후기</label>
            <input id="review"  {...register("review")}></input>
          </li>
          <li>
            <label htmlFor="advantage">장점</label>
            <input id="advantage"  {...register("advantage")}></input>
          </li>
          <li>
            <label htmlFor="disAdvantage">단점</label>
            <input id="disAdvantage" {...register("disAdvantage")}></input>
          </li>
          <li>
            <label htmlFor="brand">추천 브랜드</label>
            <input id="brand" {...register("brand")}></input>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default WriteReview;
