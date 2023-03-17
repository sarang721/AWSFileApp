import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./index.css";
import {useGoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import {signinGoogle, signin} from "../../redux/actions/auth";

function Login() {

    const dispatch = useDispatch()
    const navigate=useNavigate();

    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        dispatch(signinGoogle(accessToken,navigate))
    }
    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

    return (
        <div >
                <h1 className="head">Welcome to FileApp</h1>
                 <button onClick={() => login()}  className="btn">
                  Sign in with google</button>
                
                    <div className="notreg">
                    <span >Not registered yet?  <Link to="/signup">Signup</Link></span>
                    </div>
                    

        </div>
    )
}

export default Login;