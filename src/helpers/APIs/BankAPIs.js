import axios from 'axios';

export const APIGetCompanyBanks = async (token) => {
    try{
        const res = await axios.get("https://bo.ssv388.info/api/bank/all",{
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data && res.data.length) {
            return res.data;
        }
    }catch(e){
        console.log(e);
    }
    return null;
}