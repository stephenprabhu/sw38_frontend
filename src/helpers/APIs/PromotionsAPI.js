import axios from "axios"

export const promotionsAPI = async () => {
  try {
    const res = await axios.get('https://bo.ssv388.info/api/get_all_promotions', {
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