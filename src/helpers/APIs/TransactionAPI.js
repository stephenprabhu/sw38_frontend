import axios from 'axios';

export const APIMakeDepositRequest = async (amount, account_number, selected_bank_id, file) => {

    var formData = new FormData();
    formData.append("deposit_receipt", file);
    formData.append("bank_account_number", account_number);
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
        if (res.data.user_id) {
            return res.data;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}