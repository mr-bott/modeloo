import React, { useState } from 'react';
import './branchsearch.css';
import { Link } from 'react-router-dom';

const BranchSearch = () => {
  const [formData, setFormData] = useState({
    regulation: '',
    branch: '',
  });

  const regulationOptions = ["r20","r23"];
  const branchOptions = ["CSE","ECE","CSM"];
  const yearOptions = ["1","2","3","4"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="branch-form-container">
      <h2 className='quote_search'>Search via branch </h2>
      <form className="branch-upload-form" onSubmit={handleSubmit}>
        <div className="branch-upload-row">
          <div className="branch-form-group">
            <label htmlFor="regulation">regulation</label>
            <select
              id="regulation"
              name="regulation"
              value={formData.regulation}
              onChange={handleChange}
              required
            >
              <option value="">Select regulation</option>
              {regulationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="branch-form-group">
            <label htmlFor="branch">Year</label>
            <select
              id="yaer"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select year</option>
              {yearOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="branch-form-group">
            <label htmlFor="branch">Branch</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="">Select branch</option>
              {branchOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

       
        </div>

       
        <Link to="/branchsubjects" state={{ formData }}>
          <button regulation="button" className="branch-submit-btn" >
            Submit
          </button>
        </Link>
      </form>
    </div>
  );
};

export default BranchSearch;
