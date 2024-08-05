import supabase from "@/lib/supabaseClient"

const getSelectShopBookmark = async(selectShopId:string) => {
    const data = await supabase.from('selectShop_bookmark').select('*').eq('id',selectShopId)
    return data
}

export {getSelectShopBookmark}