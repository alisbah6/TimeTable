import React, { useState } from "react";
import {Link} from 'react-router-dom'
import "./Teacher.css"

const Teacher = () => {
  // State to store form input values
  const [teacherData, setTeacherData] = useState({
    name: "",
    type: "",
    level: "",
    subject: "",
  });

  // Handle change for each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Teacher Data Submitted:", teacherData);
    // You can process or store the data here (e.g., send to an API or save in localStorage)
  };

  return (
    <div className="teacher-form-container">
      <Link to="/">Home</Link>
      <h1 className="teacher-form-heading">Teacher's Information Form</h1>
      <form onSubmit={handleSubmit} className="teacher-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={teacherData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Type of Teacher (Class Teacher or Subject Teacher) */}
        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={teacherData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Class Teacher">Class Teacher</option>
            <option value="Subject Teacher">Subject Teacher</option>
          </select>
        </div>
        <div>
          <label htmlFor="level">Level:</label>
          <select
            id="level"
            name="level"
            value={teacherData.level}
            onChange={handleChange}
            required
          >
            <option value="">Select Level</option>
            <option value="PRT">PRT</option>
            <option value="PGT">TGT</option>
            <option value="TGT">PGT</option>
          </select>
        </div>

          <div>
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={teacherData.subject}
              onChange={handleChange}
              required
            />
          </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Teacher;
