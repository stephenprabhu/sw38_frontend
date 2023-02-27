import axios from 'axios';

export const APIMakeDepositRequest = async (amount, selected_bank_id, file) => {
    var formData = new FormData();
    formData.append("deposit_receipt", file);
    formData.append("transaction_amount", amount);
    formData.append("bank_id", selected_bank_id);

    const token = localStorage.getItem('auth_token')
    try {
        const res = await axios.post("https://bo.ssv388.info/api/account/deposit", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res);
        if (res.data.user_id) {
            return res.data;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}



export const APIGetAllTransactions = async(token) => {
    try {
        const res = await axios.get("https://bo.ssv388.info/api/account/user_transaction", {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res && res.data &&res.data.response && res.data.response.length) {
            console.log(res.data.response);
            return res.data.response;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}