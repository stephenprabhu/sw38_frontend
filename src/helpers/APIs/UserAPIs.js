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


// export const APIGetUserDetails = async() => {
//     try {
//         const res = await axios.post("https://bo.ssv388.info/api/login_user", {
//             phone, password
//         });
//         if (res.data && res.data.status && res.data.token) {
//             return res.data.token;
//         }
//     }catch(e){
//         console.log(e);
//     }
//     return null;
// }
