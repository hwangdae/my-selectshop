import supabase from "@/lib/supabaseClient"

const getAllReview = async() => {
    const {data} = await supabase.from('review').select('*')
    return data
}

const getReview = async(id:string) => {
    const {data} = await supabase.from('review').select("*").eq('selectshopId',id)
    return data
}
const getReviewAndUser = async(id:string) => {
    const {data} = await supabase.from('review').select('*,users("*")').eq('selectshopId',id)
    return data
}
const getReviewCount = async(a:any) => {
    const {count} = await supabase.from('review').select('*',{count:'exact',head:true})
    return count
}

export {getAllReview, getReview,getReviewAndUser,getReviewCount}