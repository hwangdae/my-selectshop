import supabase from "@/lib/supabaseClient"

const getReview = async(id:string) => {
    const {data} = await supabase.from('review').select("*").eq('selectshopId',id)
    return data
}

export {getReview}