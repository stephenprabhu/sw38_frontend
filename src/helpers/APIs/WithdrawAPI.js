import BaseUrl from "./BaseUrl";

export const WithdrawAPI = async (bank_id, transaction_amount, bank_account_number) => {

  var formData = new FormData();
  formData.append("bank_id", bank_id);
  formData.append("transaction_amount", transaction_amount);
  formData.append("bank_account_number", bank_account_number);

  const token = localStorage.getItem('auth_token')
  try {
    const res = await BaseUrl.post("/account/withdraw", formData, {
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

export const bankListAPI = async () => {
  try {
    const res = await BaseUrl.get("/bank/user_all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    return res.data
  } catch (e) {
    if (e.status === 403) {
      return "WAIT_PLEASE"
    } else if (e.status === 401) {
      return "MAKE_DEPOSIT_REQUEST_FIRST"
    }else{
      console.log(e);
    }
  }
  return null;
}