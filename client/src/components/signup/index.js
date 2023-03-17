import React, {useState} from "react";
import "./signup.css";
import {Link,useNavigate} from "react-router-dom"

import {useGoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import {signup, signupGoogle} from "../../redux/actions/auth";


function Signup() {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
   

    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        dispatch(signupGoogle(accessToken,nagivate))
    }

    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});
    return (
        <div >
                <h1 className="heading">Welcome to FileApp</h1>
                 <button className="btn" onClick={() => login()} >
                      Sign up with google</button>

        </div>
    )
}

export default Signup;