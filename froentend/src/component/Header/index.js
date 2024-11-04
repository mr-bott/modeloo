import React, { useState } from 'react';
import { Search, Menu, X, Bold } from 'lucide-react'; // X is for close icon in mobile menu.
import "./header.css";
import { FaRegUser } from "react-icons/fa";
import {Link,useNavigate}from "react-router-dom"

const Header = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track mobile menu state
const [search,setSearch]=useState("")
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const navigate=useNavigate()
const handleSearch=()=>{
   navigate("/subjects", {state:{search}});
}
  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/">
        <img src="/assets/logo.jpeg" alt="logo" className='logo-img'/>
        
        </Link>
        </div>

      <div className="search-bar-mobile">
        <input
          type="text"
          placeholder="Subject Code or Name"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className={`search-input ${isFocused ? 'focused' : ''}`}
        />
        <button className="icon-button" aria-label="Search">
          <Search size={20}   onClick={()=>handleSearch()}/>
        </button>
      </div>

      <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
      <Link to="/uploadpaper">
        <a href="#uploadpaper" className='header_para'>Upload Image</a>
        </Link>
        <a href="#contactus" className='header_para'>Contact Us</a>
        <Link to="/profile">
        <a href="#contact" className='header_para'>
        <FaRegUser size={25} fontWeight={Bold}/>
        </a>
       
        </Link>
      </div>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
};

export default Header;
