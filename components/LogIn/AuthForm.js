import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import AuthContext from '../Store/Auth-Context';


import classes from './AuthForm.module.css';

const AuthForm = () => {
    const histoy = useHistory()
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext)

    const enteredEmailRef = useRef('')
    const enteredPasswordRef = useRef('')

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault()
        const enteredEmail = enteredEmailRef.current.value
        const enteredPassword = enteredPasswordRef.current.value
        setIsLoading(true)
        let url
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLwFZKg8KZEIlRPJ_FBc37TP7Vk45D3AE'

        } else (
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLwFZKg8KZEIlRPJ_FBc37TP7Vk45D3AE'

        )
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            setIsLoading(false)
            if (res.ok) {
                res.json().then(data => {
                    console.log(data)
                    const loginEmail = enteredEmail.replace(/[^a-zA-Z ]/g, "")
                    authCtx.logIn(data.idToken, loginEmail)
                    histoy.replace('/store')
                })
                
            } else {
                res.json().then(data => {
                    console.log(data)
                    let errorMessage = 'authentication failed...'
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message
                    }
                    alert(errorMessage)
                })
            }
        }).then(data => {
            console.log(data)
            histoy.replace('/store')



        }).catch(err => {
            console.log(err)
        })
        enteredEmailRef.current.value = ''
        enteredPasswordRef.current.value = ''

    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' ref={enteredEmailRef} required />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' ref={enteredPasswordRef} required />
                </div>
                <div className={classes.actions}>
                    {isLoading && <p>Sending Request...</p>}
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;