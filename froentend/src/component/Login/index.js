// import React,{useState} from 'react';
// import './login.css';

// const Login = () => {
//     const [logdetails,setLogdetails]=useState({
//         gmail:"",
//         password:""
//     })
//    console.log(logdetails.gmail)
//    console.log(logdetails.password)
//   return (
//     <div className="wrapper">
//       <div className="card-switch">
//         <label className="switch">
//           <input type="checkbox" className="toggle" />
//           <span className="slider"></span>
//           <div className="flip-card__inner">
//             <div className="flip-card__front">
//               <div className="title">Log in</div>
//               <form className="flip-card__form" action="">
//                 <input
//                   className="flip-card__input"
//                   name="email"
//                   placeholder="Email"
//                   type="email"
//                   value={logdetails.gmail}
//                   onChange={(e)=>{
//                     setLogdetails({[e.target.name]:e.target.value,
                        
//                     })
//                   }}
                  
//                 />
//                 <input
//                   className="flip-card__input"
//                   name="password"
//                   placeholder="Password"
//                   type="password"
//                   value={logdetails.password}
//                   onChange={(e)=>{
//                     setLogdetails({password:e.target.value})
//                   }}
               
//                 />
//                 <button className="flip-card__btn">Let’s go!</button>
//               </form>
//             </div>

//             <div className="flip-card__back">
//               <div className="title">Sign up</div>
//               <form className="flip-card__form" action="">
              
//                 <input
//                   className="flip-card__input"
//                   name="email"
//                   placeholder="Email"
//                   type="email"
                 
                 
//                 />
//                 <input
//                   className="flip-card__input"
//                   name="password"
//                   placeholder="Password"
//                   type="password"
                  
//                 />
//                 <button className="flip-card__btn">Confirm!</button>
//               </form>
//             </div>
//           </div>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [logdetails, setLogdetails] = useState({
    gmail: '',
    password: '',
  });

  const [signdetails,setSigndetails]=useState({
    gmail: '',
    password: '',
    conform:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogdetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleSignDetails=(e)=>{

  }

  console.log(signdetails.gmail);
  console.log(signdetails.password);

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form" action="">
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
              </form>
            </div>

            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form className="flip-card__form" action="">
                <input
                  className="flip-card__input"
                  name="email"
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
                />
                <button className="flip-card__btn" type="submit">
                  Confirm!
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Login;
