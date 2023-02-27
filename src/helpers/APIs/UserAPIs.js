import axios from 'axios';

export const APIRegisterUser = async (phone, password) => {
    try {
        const res = await axios.post("https://bo.ssv388.info/api/register_user", {
            phone, password
        });
        console.log(res);
        if (res.data && res.data.status && res.data.token) {
            return res.data.token;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}


export const APILoginUser = async (phone, password) => {
    try {
        const res = await axios.post("https://bo.ssv388.info/api/login_user", {
            phone, password
        });
        if (res.data && res.data.status && res.data.token) {
            return res.data.token;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}


export const APICheckIfPhoneExists = async(phone)=> {
    try {
        const res = await axios.post('https://bo.ssv388.info/api/check_phone/' + phone);
        if (res.data && res.data.status) {
            return true;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}


export const APIRegisterAgent = async(phone, password, bank_name, account_name, account_number) => {
    try {
        const res = await axios.post("https://bo.ssv388.info/api/register_agent",{
            phone, password, bank_name, account_name, account_number
        });
        if (res.data && res.data.status) {
            return res.data.status;
        }
    }catch(e){
        console.log(e);
        
    }
    return null;
}
