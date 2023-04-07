import BaseUrl from "./BaseUrl";


export const APIGetCompanyBanks = async (token) => {
  try {
    const res = await BaseUrl.get("/bank/all", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.data && res.data.length) {
      return res.data;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}