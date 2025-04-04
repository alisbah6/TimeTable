import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Teacher.css";

const Teacher = () => {
  // State to store form input values
  const [teacherData, setTeacherData] = useState({
    name: "",
    type: "",
    level: "",
    teacherclass: "",
    subject: [],
  });

  // Handle change for each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle change for subjects input (comma-separated values)
  const handleSubjectsChange = (e) => {
    const value = e.target.value;
    const subjectsArray = value.split(",").map((subject) => subject.trim());
    setTeacherData((prevData) => ({
      ...prevData,
      subject: subjectsArray,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Teacher Data Submitted:", teacherData);

    try {
      const response = await fetch("http://localhost:3200/teacher/newteacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData), // Send form data as JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from server:", data);

      // Clear the form on successful submission
      setTeacherData({
        name: "",
        type: "",
        level: "",
        teacherclass: "",
        subject: [],
      });

      alert("Teacher data submitted successfully!");
    } catch (error) {
      console.error("Error submitting teacher data:", error);
      alert("Failed to submit teacher data. Please try again.");
    }
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
            <option value="TGT">TGT</option>
            <option value="PGT">PGT</option>
          </select>
        </div>
        <div>
          <label htmlFor="teacherclass">Class:</label>
          <select
            id="teacherclass"
            name="teacherclass"
            value={teacherData.teacherclass}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            <option value="Nursery">Nursery</option>
            <option value="Kg">Kg</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>

        <div>
          <label htmlFor="subject">Subjects:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={teacherData.subject.join(", ")} // Join array for display
            onChange={handleSubjectsChange}
            placeholder="Enter subjects separated by commas"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Teacher;
