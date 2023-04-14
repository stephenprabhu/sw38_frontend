import BaseUrl from "./BaseUrl";

export const APIRegisterUser = async (phone, password, agentId) => {
  try {
    const res = await BaseUrl.post("/register_user", {
      phone, password, agent_id : agentId
    });
    if (res.data && res.data.status && res.data.token) {
      return res.data.token;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

export const APILoginUser = async (phone, password) => {
  try {
    const res = await BaseUrl.post("/login_user", {
      phone, password
    });
    if (res.data && res.data.status && res.data.token) {
      return res.data.token;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

export const APICheckIfPhoneExists = async (phone) => {
  try {
    const res = await BaseUrl.get('/check_phone/' + phone);
    if (res.data && res.data.status) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

export const APIRegisterAgent = async (name,phone, password) => {
  try {
    const res = await BaseUrl.post("/register_agent", {
      name, phone, password
    });
    if (res.data && res.data.status) {
      return res.data.status;
    }
  } catch (e) {
    console.log(e);

  }
  return null;
}

export const APIUser = async () => {
  try {
    const res = await BaseUrl.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    return res.data
  } catch (e) {
    return e
  }
  return null;
}
