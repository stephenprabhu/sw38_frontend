export const addCommasToNumber = val => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export const addCommasToInput = val => {
    var arr = val.split('');
    var out = new Array();
    for(var cnt=0;cnt<arr.length;cnt++){
        if(isNaN(arr[cnt])==false){
            out.push(arr[cnt]);
        }
    }
    const num = Number(out.join(''));
    if(num==0){
        return "";
    }else{
        return num.toLocaleString();
    }
}