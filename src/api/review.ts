import supabase from "@/lib/supabaseClient"
import { ReviewType, UploadReviewType } from "@/types/reviewType"

const getAllReview = async() => {
    const {data} = await supabase.from('review').select('*')
    return data
}

const getReview = async(id:string) => {
    const {data} = await supabase.from('review').select("*").eq('selectshopId',id)
    return data
}
const getMyReview = async(selectshopId:string,userId:string) => {
    const {data} = await supabase.from('review').select("*").eq('selectshopId',selectshopId).eq('userId',userId)
}
const getReviewAndUser = async(id:string) => {
    const {data} = await supabase.from('review').select('*,users("*")').eq('selectshopId',id)
    return data
}
const getReviewCount = async(loginUser:string) => {
    const {count} = await supabase.from('review').select('*',{count:'exact',head:true}).eq('userId',loginUser)
    return count
}
const addReview = async(review:UploadReviewType) => {
    await supabase.from("review").insert(review);
}
export {getAllReview, getReview,getMyReview,getReviewAndUser,getReviewCount,addReview}