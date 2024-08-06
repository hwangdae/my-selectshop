import supabase from "@/lib/supabaseClient"

interface newSelectShopType {
    selectShopId : string;
    userId : string;
}

const getSelectShopBookmark = async(selectShopId:string) => {
    const {data} = await supabase.from('selectShop_bookmark').select("*")
    return data
}

const addSelectShopBookmark = async(newSelectShopBookmark:newSelectShopType):Promise<void> => {
    await supabase.from('selectShop_bookmark').insert(newSelectShopBookmark)
}

const deleteSelectShopBookmark = async(id:string,loginUser:string) => {
    await supabase.from('selectShop_bookmark').delete().eq('selectShopId',id).eq('userId',loginUser);
}

export {getSelectShopBookmark,addSelectShopBookmark,deleteSelectShopBookmark}