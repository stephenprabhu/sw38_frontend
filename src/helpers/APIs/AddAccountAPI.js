import BaseUrl from "./BaseUrl";

export const AddAccountAPI = async (bank_name, account_number, User_name) => {

  var formData = new FormData();
  formData.append("bank_name", bank_name);
  formData.append("account_number", account_number);
  formData.append("User_name", User_name);

  const token = localStorage.getItem('auth_token')
  try {
    const res = await BaseUrl.post("/bank/add_user_bank", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    if (res.data.user_id) {
      return res.data.user_id;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}
