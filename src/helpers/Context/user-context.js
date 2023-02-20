import React from "react";

const UserContext = React.createContext({
    user: null,
    setUser: () => {},
    firstTimeLogin: null,
    setFirstTimeLogin: () => {}
});

export default UserContext;