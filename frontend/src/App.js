import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const apiUrl = "http://localhost:3000/api";

function App() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []); // Empty dependency array means this effect runs once on page load

  const fetchRecords = async () => {
    try {
      const response = await axios.get(apiUrl); // Replace with your API endpoint
      setRecords(response.data.records);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a preview for the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    if (!text || !image) {
      alert('Please add text and image');
      return;
    }
    formData.append('text', text);
    formData.append('image', image);

    await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setText('');
    setImage('');
    setImagePreview('');
    document.querySelector('.form-container input[type="file"]').value = "";
    fetchRecords();
  };

  const previewExistingRecord = (index) => {
    if (!records[index]) return;
    setImage('');
    setText(records[index].text);
    setImagePreview(records[index].imageBuffer);
  };

  const containerStyle = {
    backgroundImage: `url(${imagePreview})`,
    backgroundRepeat: "no-repeat",
    height: "85%",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    maxHeight: "85%"
  };

  return (
    <div className="app-container">
      <div className="row">
        <div className="left-section col-md-6">
          <div className="top-section">
            <h1 className="app-title">React Template</h1>
            <div className="form-container">
              <label htmlFor="text">Text:</label>
              <textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                rows="4"
                cols="50"
              />

              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />

              <button onClick={handleSaveClick} className="save-button">Save</button>
            </div>
          </div>

          <div className="bottom-section">
            <h2>Preview:</h2>
            <div style={containerStyle} className="preview-container">
              <p>{text}</p>
            </div>
          </div>
        </div>
        <div className="right-section col-md-6">
          <div className="records-container">
            <h2>Records:</h2>
            <ul className="records-list">
              {records.map((record, index) => (
                <li key={index} onClick={() => previewExistingRecord(index)}>
                  <div className="record-text">{index + 1}. {record.text}</div>
                  <img src={record.imageBuffer} alt="Record Image" className="record-image" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;