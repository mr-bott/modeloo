
import React, { useState, useEffect, useContext } from 'react';
import './userprofile.css';
import { MdDeleteOutline } from "react-icons/md";
import { UserContext } from '../../context/UserContext';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = useContext(UserContext);
  const user = userData?.details?.[0] || {};
  const navigate=useNavigate();

  const fetchUploads = async () => {
    try {
      const url = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${url}/myuploads/${user.rollno}`);
      if (!response.ok) throw new Error('Failed to fetch uploads');

      const data = await response.json();
      setUploads(data.rows);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchUploads();
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const url = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${url}/delete_paper/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete upload');
      setUploads((prev) => prev.filter((project) => project.id !== id));
    } catch (err) {
      console.error('Error deleting upload:', err);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
  };

  if (loading) return 
  <div className="loader_container">
  <Loader/>
  {/* <p>wait until upload complete...</p> */}
</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.name?.charAt(0).toUpperCase() || ''}
            </div>
            <h1 className="profile-name">{user.name || 'Unknown User'}</h1>
            <div className="detail-item">
              <span>{user.gmail || 'N/A'}</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="sub_profile">
              <div className="detail-item">
                <label>Roll Number</label>
                <span>{user.rollno || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <label>Year</label>
                <span>{user.year || 'N/A'}</span>
              </div>
            </div>
            <div className="sub_profile">
              <div className="detail-item">
                <label>Branch</label>
                <span>{user.branch || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <label>SEM</label>
                <span>{user.sem || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="uploads-card">
          <h2>My Uploads</h2>
          <div className="uploads-list">
            {uploads.length > 0 ? (
              uploads.map((project) => (
                <div key={project.id} className="upload-item" >
                  <div className="upload-info" onClick={() => navigate('/bigimage', { state: { project } })}>
                
                    <div className="file-type">img</div>
                    <div className="file-type">{project.sub_code}</div>
                    <div className="file-details">
                      <h3>{project.sub_name}</h3>
                      <span className="upload-date">
                        {formatDate(project.upload_time)}
                      </span>
                    </div>

                  
                    
                  </div>
                 
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(project.id)}
                    aria-label="Delete upload"
                  >
                    <MdDeleteOutline />
                  </button>
                
                </div>
              ))
            ) : (
              <h1 className='no_uploads'>No Uploads</h1>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
