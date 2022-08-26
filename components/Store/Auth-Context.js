import React from "react"
const AuthContext = React.createContext({
    token: '',
    email: '',
    isLoggedIn: false,
    logIn: (token) => { },
    logOut: () => { }
})

export default AuthContext