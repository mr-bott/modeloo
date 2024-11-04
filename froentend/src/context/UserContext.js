import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const jwt = Cookies.get('jwt');
  const decoded = jwt ? jwtDecode(jwt) : null;
  const gmail = decoded?.email;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${url}/getdetails/${gmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setUserData(result);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (gmail) fetchUserData();
  }, [gmail]);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
