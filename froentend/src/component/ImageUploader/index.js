import React, { useState } from 'react';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) {
      setUploadStatus('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadStatus('Image uploaded successfully!');
        setImageUrl(data.url); // Display the returned image URL
      } else {
        setUploadStatus(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('An error occurred during upload.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={styles.button}>Upload</button>
      <p>{uploadStatus}</p>
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={styles.image} />
        </div>
      )}
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  image: {
    marginTop: '10px',
    width: '300px',
    height: 'auto',
  },
};

export default ImageUploader;
