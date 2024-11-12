
import "./userdetails.css";
import Loader from "../Loader"

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const UserDetails = ({ gmaildata }) => {
  
  const jwt = Cookies.get('jwt');
  const decoded = jwt ? jwtDecode(jwt) : null;
  const gmail = decoded?.email;
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    branch: '',
    name: '',
    rollno: '',  // Consistent key name
    sem: '',      // Consistent key name
    year: '',
    regulation: ''
  });
 
  const [isloading,setIsloading]=useState(false)

  const branches = ["CSE", "CSM", "CSD", "CSC", "CSA", "ECE", "EEE", "MECH"];
  const semesters = [1, 2];
  const years = [1, 2, 3, 4];
  const regulations = ["r20", "r23"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert roll number to uppercase
    if (name === 'rollno') {
      setFormData((prev) => ({
        ...prev,
        [name]: value.toUpperCase()
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      setIsloading(true)
      const url = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${url}/update_details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, gmail:gmail }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); 

      console.log('Form submitted successfully:', data);

      // Reset form data
      setFormData({
        branch: '',
        name: '',
        rollno: '',
        sem: '',
        year: '',
        regulation: ''
      });
      setIsloading(false)
      navigate("/home")
      alert("Details updated");

    } catch (error) {
      setIsloading(false)
      console.error('Error submitting form:', error);
    }
  };

  if(isloading){
    return(
      <div className="loader_container">
      <Loader/>
      <p>wait until details updated...</p>
    </div>
    )
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="heading">Student Registration</h2>

        <div className="formGroup">
          <label className="label">Branch:</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        <div className="formGroup">
          <label className="label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="formGroup">
          <label className="label">Roll No:</label>
          <input
            type="text"
            name="rollno"  // Use the correct key
            value={formData.rollno}
            onChange={handleChange}
            className="input"
            pattern="[A-Z0-9]+"
            title="Only capital letters and numbers allowed"
            required
          />
        </div>

        <div className="formGroup">
          <label className="label">Semester:</label>
          <select
            name="sem"  // Use the correct key
            value={formData.sem}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        <div className="formGroup">
          <label className="label">Year:</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="formGroup">
          <label className="label">Regulation:</label>
          <select
            name="regulation"
            value={formData.regulation}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select Regulation</option>
            {regulations.map((regulation) => (
              <option key={regulation} value={regulation}>{regulation}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default UserDetails;
