import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../assets/images/dark-logo.png";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useAuth} from "../context/GlobalState";
import {auth} from "../firebase";
import  {useNavigate} from "react-router-dom";

import "./Login.css"
const Login = () => {
    const {user} = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,  email, password).then((authUser) => {
            if(authUser) {
                navigate("/")
            }
        });

    };

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then((auth) => {
            if(auth) {
                navigate("/");
            }
        }).catch((err) => alert(err.message));
    };
    return (
        <div className='login'>
            <Link to="/">
                <img className="login-logo" src={Logo} alt="logo-img" />
            </Link>
            <div className='login-container'>
                <h1>Sign in</h1>
                <form action="">
                    <h5>Email</h5>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className='login-signInBtn' onClick={signIn}>Sign in</button>
                    <p>By continuing, you agree to Amazon's fake clone conditions of Use and Privacy Notice.</p>
                    <button className='login-registerBtn' onClick={register}>Create your Amazon Account</button>
                </form>
            </div>
        </div>
    )
}

export default Login
