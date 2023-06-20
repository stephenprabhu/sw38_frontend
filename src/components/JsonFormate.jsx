const JsonFormate = (data) => {
    const obj = JSON.parse(data && data);
    if(obj && obj.en){
        return  obj.en ;
    }
}
export default JsonFormate