import BaseUrl from "./BaseUrl";

export const promotionsAPI = async () => {
  try {
    const res = await BaseUrl.get('/get_all_promotions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    return res
  } catch (error) {
    console.log(error);
  }
  return null
}