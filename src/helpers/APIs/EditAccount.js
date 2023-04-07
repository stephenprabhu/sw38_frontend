import BaseUrl from "./BaseUrl";

export const EditAccount = async (bank_name, account_number, User_name, id) => {

  var formData = new FormData();
  formData.append("bank_name", bank_name);
  formData.append("account_number", account_number);
  formData.append("User_name", User_name);

  const token = localStorage.getItem('auth_token')
  try {
    const res = await BaseUrl.post("/bank/edit_user_bank/" + id, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.data) {
      return res.data
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}