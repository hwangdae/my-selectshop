import supabase from "@/lib/supabaseClient"

const getReview = async(id:string) => {
    const {data,count : reviewCount} = await supabase.from('review').select("*").eq('selectshopId',id)

    let response = {data, count : data?.length}
    return response
}

export {getReview}