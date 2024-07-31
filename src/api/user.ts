import supabase from "@/lib/supabaseClient";

const getUser = async(id:string) => {
    const {data} = await supabase.from('users').select('*').eq('id',id).single()
    return data
}

export {getUser}