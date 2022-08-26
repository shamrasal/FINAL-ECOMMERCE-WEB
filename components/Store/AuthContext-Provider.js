import React, { useState } from "react";
import AuthContext from "./Auth-Context";

const AuthContexProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const initialEmail = localStorage.getItem('email')
    const [token, setToken] = useState(initialToken)
    const [email, setEmail] = useState(initialEmail)
    const userIsLoggedIn = !!token
    const loginHandler = (token, email) => {
        localStorage.setItem('token', token)
        setToken(token)
        setEmail(email)
        localStorage.setItem('email', email)
    }
    const logOutHandler = () => {
        setToken(null)
        setEmail(null)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }

    const authcontext = {
        token: token,
        email: email,
        isLoggedIn: userIsLoggedIn,
        logIn: loginHandler,
        logOut: logOutHandler
    }
    return (
        <AuthContext.Provider value={authcontext}>
            {console.log(email)}
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContexProvider