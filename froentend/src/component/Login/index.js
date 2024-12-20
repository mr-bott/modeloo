import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './login.css';

const Login = () => {
  const navigate = useNavigate(); 

  const [logdetails, setLogdetails] = useState({
      gmail: '',
      password: '',
  });

  const [signdetails, setSigndetails] = useState({
      gmail: '',
      password: '',
      confirm: '',
      otp: "",
  });

  const [show, setShow] = useState(true);

  // Handle Login Input Change
  const handleChange = (e) => {
      const { name, value } = e.target;
      setLogdetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
      }));
  };

  // Handle Signup Input Change
  const handleSignDetails = (e) => {
      const { name, value } = e.target;
      setSigndetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
      }));
  };

  const handleSignupSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      if (signdetails.password !== signdetails.confirm) {
          alert("Passwords don't match!");
      } else {
          console.log('Signup Successful!', signdetails);
          await otpfunction(); // Call the OTP function on successful signup
      }
  };

  const otpfunction = async () => {
      try {
          setShow(false);
          const response = await fetch("http://localhost:8000/send_otp", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ gmail: signdetails.gmail }), 
          });

          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          console.log("OTP sent successfully!", data);
      } catch (error) {
          console.error("Failed to send OTP:", error);
      }
  };

  const loginaccount = async (e) => { // Added event as parameter
      e.preventDefault(); // Prevent default form submission

      try {
          const response = await fetch("http://localhost:8000/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ gmail: logdetails.gmail, password: logdetails.password }),
          });

          if (!response.ok) {
              console.log("Login failed");
              return; // Exit early on failure
          }

          const data = await response.json(); // Assuming the JWT is in the response JSON
          console.log("Successfully logged in", data);
          Cookies.set('jwt', data.token, { expires: 7 }); // Store JWT in cookies
          navigate("/"); // Navigate after setting cookie
      } catch (error) {
          console.error("Failed to log in:", error);
      }
  };

  const handleCreateAccount = async (e) => {
      e.preventDefault(); // Prevent default form submission

      try {
          const response = await fetch("http://localhost:8000/verify_otp", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ gmail: signdetails.gmail, otp: signdetails.otp }), 
          });

          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const signupResponse = await fetch("http://localhost:8000/signup", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ gmail: signdetails.gmail, password: signdetails.password, signup_method: "manual" }), 
          });

          if (!signupResponse.ok) {
              console.log("Account not created");
          } else {
              console.log("Account created");
          }
      } catch (error) {
          console.error("Failed to verify OTP or create account:", error);
      }
  };


  // const handleGoogle = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/auth/google/`, {
  //       method: 'GET',
  //       credentials: 'include', // Send cookies with the request if needed
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     const data = await response.json();
  //     const { token } = data;
  
  //     // Store the JWT token
  //     Cookies.set('jwt', token, { expires: 7 });
  //     // Navigate to the home page or another page after successful login
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error during Google login:', error);
  //     alert('Login failed. Please try again.');
  //   }
  // };
  
  const handleGoogle = () => {
    window.location.href = 'http://localhost:8000/auth/google'; // Redirect to your backend for Google login
  };
  

  return (
      <div className="wrapper">
          <div className="card-switch">
              <label className="switch">
                  <input type="checkbox" className="toggle" />
                  <span className="slider"></span>
                  <div className="flip-card__inner">
                      {/* Login Form */}
                      <div className="flip-card__front">
                          <div className="title">Log in</div>
                          <form className="flip-card__form" onSubmit={loginaccount}>
                              <input
                                  className="flip-card__input"
                                  name="gmail"
                                  placeholder="Email"
                                  type="email"
                                  value={logdetails.gmail}
                                  onChange={handleChange}
                              />
                              <input
                                  className="flip-card__input"
                                  name="password"
                                  placeholder="Password"
                                  type="password"
                                  value={logdetails.password}
                                  onChange={handleChange}
                              />
                              <button className="flip-card__btn" type="submit">
                                  Let’s go!
                              </button>
                              <hr className="line" />
                              <button className="flip-card__google" onClick={handleGoogle}>
                                 Continue with Google
                              </button>
                               {/* <button className="flip-card__google">
                                      <a href="http://localhost:8000/auth/google/" className='google_style'>Continue with Google</a>
                                  </button> */}
                          </form>
                      </div>

                      {/* Signup Form */}
                      <div className="flip-card__back">
                          <div className="title">Sign up</div>
                          {show && (
                              <form className="flip-card__form" onSubmit={handleSignupSubmit}>
                                  <input
                                      className="flip-card__input"
                                      name="gmail"
                                      placeholder="Email"
                                      type="email"
                                      value={signdetails.gmail}
                                      onChange={handleSignDetails}
                                  />
                                  <input
                                      className="flip-card__input"
                                      name="password"
                                      placeholder="Password"
                                      type="password"
                                      value={signdetails.password}
                                      onChange={handleSignDetails}
                                  />
                                  <input
                                      className="flip-card__input"
                                      name="confirm"
                                      placeholder="Confirm Password"
                                      type="password"
                                      value={signdetails.confirm}
                                      onChange={handleSignDetails}
                                  />
                                  <button className="flip-card__btn" type="submit">
                                      Confirm!
                                  </button>
                                  <hr className="line" />
                                  <button className="flip-card__google">
                                      <a href="http://localhost:8000/auth/google/" className='google_style'>Continue with Google</a>
                                  </button>
                              </form>
                          )}

                          {!show && (
                              <form className='flip-card__form otp' onSubmit={handleCreateAccount}>
                                  <input
                                      className="flip-card__input"
                                      name="otp"
                                      placeholder="OTP"
                                      type="text"
                                      value={signdetails.otp}
                                      onChange={handleSignDetails}
                                  />
                                  <button className="flip-card__btn" type="submit">
                                      Verify and Create Account
                                  </button>
                              </form>
                          )}
                      </div>
                  </div>
              </label>
          </div>
      </div>
  );
};

export default Login;
