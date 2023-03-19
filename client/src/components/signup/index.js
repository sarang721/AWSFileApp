import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { signup, signupGoogle } from "../../redux/actions/auth";

function Signup() {
  const nagivate = useNavigate();
  const dispatch = useDispatch();

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    dispatch(signupGoogle(accessToken, nagivate));
  }

  const signup = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  return (
    <div>
      <h1 className="head">Welcome to FileApp</h1>
      <button onClick={() => signup()} className="btn">
        Sign Up with google
      </button>

      <div className="notreg">
        <span>
          Already Signed Up? <Link to="/">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
