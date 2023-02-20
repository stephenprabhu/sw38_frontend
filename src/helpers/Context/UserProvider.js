import { useState } from "react";
import UserContext from "./user-context";

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);


  const userContext = {
    user, 
    setUser,
    userInfo,
    setUserInfo
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;