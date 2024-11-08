
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import AllImages from './component/AllImages';
import UserProfile from './component/UserProfile';
import UploadForm from './component/UploadForm';
import Subjects from './component/Subjects';
import Footer from './component/Footer';
import Home from './component/Home';
import BranchSubjects from './component/BranchSubjects';
import ProtectedRoute from './component/ProtectedRoute';
import Cookies from 'js-cookie';
import UserProvider from './context/UserContext';
import BigImage from "./component/BigImage"
import LoginButton from './component/LoginButton';
import UploadNotification from './component/UploadNotification';

const App = () => (
  <UserProvider>
    <Router>
      <MainContent />
    </Router>
  </UserProvider>
);

const MainContent = () => {
  const location = useLocation(); // Now useLocation is within Router context
  const navigate = useNavigate();

  return (
    <>
      {/* Conditionally render Header only if the current path is not /login */}
      {location.pathname !== '/login' && <Header />}

      <Routes>
        <Route path="/login" element={<LoginButton />} />
        <Route path="/" element={<TokenHandler navigate={navigate} />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/allimages" element={<ProtectedRoute element={<AllImages />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/uploadpaper" element={<ProtectedRoute element={<UploadForm />} />} />
        <Route path="/uploadnotification" element={<ProtectedRoute element={<UploadNotification />} />} />
        <Route path="/subjects" element={<ProtectedRoute element={<Subjects />} />} />
        <Route path="/footer" element={<ProtectedRoute element={<Footer />} />} />
        <Route path="/branchsubjects" element={<ProtectedRoute element={<BranchSubjects />} />} />
        <Route path="/bigimage" element={<BigImage />} />
      </Routes>
    </>
  );
};

// TokenHandler component to manage JWT token logic
const TokenHandler = ({ navigate }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      // Store the JWT token in cookies
      Cookies.set('jwt', token, { expires: 7 });
      // Redirect to the home path after storing the token
      navigate('/home');
      // Clear the token from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // If there is no token, check if the user is authenticated
      const jwt = Cookies.get('jwt');
      if (!jwt) {
        // If the user is not authenticated, redirect to the login page
        navigate('/login');
      } else {
       //redirect to the home page
        navigate('/home');
      }
    }
  }, [navigate]);

  return null; // This component does not need to render anything
};

export default App;
