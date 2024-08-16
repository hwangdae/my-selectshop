import supabase from "@/lib/supabaseClient"

const getReview = async() => {
    const {data} = await supabase.from('review').select()
    return data
}

export {getReview}