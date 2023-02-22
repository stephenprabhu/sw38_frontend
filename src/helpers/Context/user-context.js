import React from "react";

const UserContext = React.createContext({
    user: null,
    setUser: () => { },
    userInfo: null,
    setUserInfo: () => { }
});

export default UserContext;