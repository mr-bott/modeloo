import React, { useState } from 'react';
import {useNavigate}from "react-router-dom"
import './login.css';

const Login = () => {
  const navigate=useNavigate()

    const [logdetails, setLogdetails] = useState({
        gmail: '',
        password: '',
    });


    const [signdetails, setSigndetails] = useState({
        gmail: '',
        password: '',
        confirm: '',
        otp:"",
    });

    const [show, setShow] = useState(true)

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

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (signdetails.password !== signdetails.confirm) {
            alert("Passwords don't match!");
        } else {
            console.log('Signup Successful!', signdetails);
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
      const loginaccount= async()=>{
     
        try{
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ gmail: logdetails.gmail ,password:logdetails.password}), 
              });
          
              if (!response.ok) {
                navigate("/fuckedup")
                throw new Error(`Error: ${response.status} ${response.statusText}`);
              }
              else{
                console.log("sucessfully login ")
               navigate("/img")
              }
          
            } catch (error) {
              console.error("Failed to send OTP:", error);
            }
      }
      

    const handleCreateAccount= async ()=>{
        try{
        const response = await fetch("http://localhost:8000/verify_otp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gmail: signdetails.gmail , otp:signdetails.otp}), 
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
            console.log("fuckup")
          }
          try{
            const response = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ gmail: signdetails.gmail ,password:signdetails.password, signup_method:"manual"}), 
              });
          
              if (!response.ok) {
                console.log("not created ")
              }
            else{
                console.log("account created ")
            }
              
            
            } catch (error) {
              console.error("failed to create account:", error);
            }
          
        
        } catch (error) {
          console.error("Failed to verify otp:", error);
        }
        
    }

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

                               
                            </form>
                            <button className="flip-card__google" >
                            <a href="http://localhost:8000/auth/google/">Continue with Google</a>
                                </button>
                        </div>

                        {/* Signup Form */}
                        <div className="flip-card__back">
                            <div className="title">Sign up</div>

                            {show && <form className=" flip-card__form" onSubmit={handleSignupSubmit}>
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
                                <button className="flip-card__btn" type="submit" onClick={otpfunction} >
                                    Confirm!
                                </button>
                                <hr className="line" />

                                <button className="flip-card__google" >
                                     <a href="http://localhost:8000/auth/google/">Continue with Google</a>
                                </button>
                               
                            </form>}

                            {!show && <form className='flip-card__form otp' onSubmit={handleCreateAccount}>
                                <input
                                    className="flip-card__input"
                                    name="otp"
                                    placeholder="Otp"
                                    type="otp"
                                    value={signdetails.otp}
                                    onChange={handleSignDetails}
                                />
                                 <button className="flip-card__btn" type="submit">
                                   verify And Create acccount
                                </button>

                            </form>
                            }


                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default Login;
