import React from "react";
import { Link } from "react-router-dom";
import { ttlogo, fblogo, iglogo, twitchlogo } from "../img";
import "./page-styles.css";

function SignUp() {
  return (
    <div className="login-layout flex">
      <div className="left-decor hidden sm:flex w-[40vw] h-[100vh] bg-black"></div>

      <div className="login-container flex flex-col gap-5 p-10">
        <div className="text-3xl">Sign Up</div>
          <span>
          Already have an account? <Link to="/login" className="font-semibold hover:underline">Login here</Link> instead.</span>
        <div className="flex gap-10">
          <img src={fblogo} className="login-logo" alt="facebook"></img>
          <img src={twitchlogo} className="login-logo" alt="twitch"></img>
          <img src={ttlogo} className="login-logo" alt="tiktok"></img>
          <img src={iglogo} className="login-logo" alt="instagram"></img>
        </div>
        <div className="username-login-container flex flex-col gap-3">
          <div>Or with username</div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="input-field mt-1 w-auto mr-9 rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            className="input-field mt-1 w-auto mr-9 rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button className="dark-btn-norm mt-6">
            <Link to="/dashboard">Sign Up</Link>
            </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
