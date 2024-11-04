
import { useLocation } from 'react-router-dom';
import React from 'react';
import './bigimage.css'; // Importing the standard CSS file

const BigImage = () => {
  const location = useLocation();
  const { project } = location.state || {};

  // Function to format the exam date
  const formatExamDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="portraitImageCard-container">
      <div className="portraitImageCard-content">
        <div className='potrait_row'>
          <h1 className="portraitImageCard-title">{project.sub_name}</h1>
          <p className="portraitImageCard-description">
            {project.sub_code}
          </p>
         
         
        </div>
        <div className='potrait_row'>
        <h1 className="portraitImageCard-title">{formatExamDate(project.Exam_date)}</h1>
        <p className="portraitImageCard-description">
            {project.Type}
          </p>
         
        </div>
      </div>
      <div className="portraitImageCard-imageContainer">
        <img 
          src={project.img} 
          alt={project.sub_name}
          className="portraitImageCard-image" 
        />
      </div>
    </div>
  );
};

export default BigImage;
