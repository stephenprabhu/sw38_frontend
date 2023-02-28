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
        if (res.data.user_id) {
        return res.data;
        }
    } catch (e) {
        if (e.message === 'Request failed with status code 422') {
            return "ERR_FILE_FORMAT_INVALID"
        }
    }
  return null;
}



export const APIGetAllTransactions = async(token) => {
    try {
        const res = await axios.get("https://bo.ssv388.info/api/account/user_transaction", {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res && res.data &&res.data.response && res.data.response.length) {
            return res.data.response;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}