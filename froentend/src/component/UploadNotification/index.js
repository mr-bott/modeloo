
import React, { useState, useContext, useEffect } from 'react';
import Loader from '../Loader';
import { UserContext } from '../../context/UserContext';

const UploadNotification = () => {
  const userData = useContext(UserContext);

  const [formData, setFormData] = useState({
    type: '',
    rollNo: userData?.details[0]?.rollno || '',
    image: null,
    ExamDate: '',
    regulation:"",
    year:"",

  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        rollNo: userData.details[0].rollno,
      }));
    }
  }, [userData]);

  const typeOptions = ["FEE-NOTIFICATION", "EXAM-NOTIFICATION","Other"];
  const yearOptions = [1,2,3,4];
  const regulationOptions=["r17","r20","r23"]
//   const branchOptions=["CSE", "CSM", "CSD", "CSC", "CSA", "ECE", "EEE", "MECH"]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'subCode' ? value.toUpperCase() : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      console.log(formData);
      const url = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${url}/uploadnotifications`, {
        method: 'POST',
        body: data,
      });

      if (response.status === 409) {
        // Handle 409 Conflict error
        setErrorMessage('Record with the same subject code and exam date already exists. Upload skipped.');
      } else if (!response.ok) {
        throw new Error('Failed to upload image');
      } else {
        const result = await response.json();
        setSuccessMessage('Image uploaded successfully!');
        console.log('Image uploaded successfully:', result);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Error uploading image');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loader_container">
        <Loader />
        <p>Wait until upload completes...</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <form className="upload-form" onSubmit={handleSubmit}>
        <h2>Image Details</h2>

        {/* Success and Error Messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

<div className="table_details">

        <div className="  form-group form-group_table">
          <label htmlFor="type">Type:</label>
          <select 
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            {typeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className=" form-group form-group_table">
          <label htmlFor="regulation">Regulation:</label>
          <select 
            id="regulation"
            name="regulation"
            value={formData.regulation}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            {regulationOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className=" form-group form-group_table">
          <label htmlFor="year">Year:</label>
          <select 
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            {yearOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        </div>

        <div className="form-group">
          <label htmlFor="ExamDate">Posting Date:</label>
          <input
            type="date"
            id="examdate"
            name="ExamDate"
            value={formData.ExamDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default UploadNotification;
