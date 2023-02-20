import axios from 'axios';

export const APIMakeDepositRequest = async (amount, account_number, selected_bank_id, file) => {
    
    var formData = new FormData();
    formData.append("deposit_receipt", file);
    formData.append("bank_account_number", account_number);
    formData.append("transaction_amount", amount);
    formData.append("bank_id", selected_bank_id);

    try{
        const res = await axios.post("https://bo.ssv388.info/api/register_user", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
        if (res.data && res.data.status && res.data.token) {
            return res.data.token;
        }
    }catch(e){
        console.log(e);
    }
    return null;
}