import axios from "axios";

export const WithdrawAPI = async (bank_id, transaction_amount, bank_account_number) => {

  var formData = new FormData();
  formData.append("bank_id", bank_id);
  formData.append("transaction_amount", transaction_amount);
  formData.append("bank_account_number", bank_account_number);

  const token = localStorage.getItem('auth_token')
  try {
    const res = await axios.post("https://bo.ssv388.info/api/account/withdraw", formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.data) {
      return res.data;
    }
  } catch (e) {
    console.log(e);
  }
  return null;

}