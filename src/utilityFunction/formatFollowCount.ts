export const formatFollowCount=(count:number | undefined)=>{
    if(count === undefined){
        return ;
    }
    if(count >= 10000) {
        return (count /10000).toFixed(1).replace(/\.0$/, '') + '만'
    }else if(count >=1000){
        return count.toLocaleString()
    }else{
        return count
    }
}