import React, { useEffect, useState, useContext } from 'react';
import Subjects from '../Subjects';
import Footer from '../Footer';
import BranchSearch from '../BranchSearch';
import UserDetails from "../UserDetails";
import { UserContext } from '../../context/UserContext';
import "./home.css"

const Home = () => {
  const [data, setData] = useState(null);
  const userData = useContext(UserContext);
  const isUserDataAvailable = userData && userData.details && userData.details.length > 0;
  const hasRollNo = isUserDataAvailable && userData.details[0].rollno;

  return (
    <div>
      {hasRollNo ? (
        <>
        <div className="home-container">
            <div className="quote-section">
                <div className="quote">
                    "Just as PUBG teaches you the best loot spots and survival tactics, model papers reveal the hotspots of exam success, helping you aim for every question with accuracy and purpose "
                </div>
                {/* <div className="author">- John Dewey</div> */}
            </div>
            <div className="cycle-section">
                <div className="circle">
                    <div className="phase" style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}>Learn</div>
                    <div className="phase" style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}>Practice</div>
                    <div className="phase" style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}>Apply</div>
                    <div className="phase" style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}>Reflect</div>
                </div>
            </div>
        </div>
          <Subjects data={userData.details[0]}/>
          <BranchSearch />
       
            <div className="quotes_container">
             
                <div className=" quote">
                    "A shared snap can open doors; it’s a simple way to guide a thousand journeys."
                </div>
                
            </div>
           
          <Footer />
        </>
      ) : (
        <UserDetails gmaildata={userData} />
      )}
    </div>
  );
};

export default Home;