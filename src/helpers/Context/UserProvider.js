import { useState } from "react";
import UserContext from "./user-context";

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [firstTimeLogin, setFirstTimeLogin] = useState(false);


  const userContext = {
    user, 
    setUser,
    firstTimeLogin,
    setFirstTimeLogin
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;