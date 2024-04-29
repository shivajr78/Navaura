import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useState } from "react";

const LoginPopup = ({ setShowLogin }) => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    register : "",
  });

  const changeHandler = (e) => {
    //here e == input field type
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function executed",formData);
    let responseData;
    //fetch the data form login API
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json()) //now parse the fetch data OR response
      .then((data) => (responseData = data)); // now save the parse data in responseData

    if (responseData.success) {
      //if the email and password are correct
      localStorage.setItem("auth-token", responseData.token); // save the generated token in local storage
      window.location.replace("/"); // redirect to home page
    } else {
      alert(responseData.error);
    }
  };

  const signup = async () => {
    console.log("signup function executed",formData);
    let responseData;
    //fetch the data form signup API
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json()) //now parse the fetch data OR response
      .then((data) => (responseData = data)); // now save the parse data in responseData

    if (responseData.success) {
      //if the email and password are correct
      localStorage.setItem("auth-token", responseData.token); // save the generated token in local storage
      window.location.replace("/"); // redirect to home page
    } else {
      alert(responseData.error);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{state}</h2>
          <img
            className="cross-btn"
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {state === "Login" ? (
            <></>
          ) : (
            <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Full Name" required />
          )}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email" required />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" required />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing,{" "}
            <span className="terms">
              i agree to the terms of use privacy policy.
            </span>{" "}
          </p>
        </div>
        {state === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setState("Sign Up")}> Click here</span>.
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setState("Login")}> Login here</span>.
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
