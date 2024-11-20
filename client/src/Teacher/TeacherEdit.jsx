import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Teacher.css';

const TeacherEdit = () => {
  const [teacherData, setTeacherData] = useState({
    name: '',
    type: '',
    level: '',
    teacherclass: '',
    subject: [],
  });
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams(); // Extract the :id parameter from the route

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(`http://localhost:3200/teacher/${id}`); 
        if (!response.ok) {
          throw new Error("Failed to fetch teacher data");
        }
        const data = await response.json();
        setTeacherData(data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3200/teacher/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });

      if (!response.ok) {
        throw new Error("Failed to update teacher");
      }

      const updatedData = await response.json();
      console.log("Updated teacher:", updatedData);

      // Navigate back to the list or confirmation page
      navigate("/AllTeacher"); // Adjust the path as needed
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!teacherData) return <p>Teacher not found</p>;


  // Handle change for subjects (comma-separated values)
  const handleSubjectsChange = (e) => {
    const value = e.target.value;
    const subjectsArray = value.split(',').map((subject) => subject.trim());
    setTeacherData((prevData) => ({
      ...prevData,
      subject: subjectsArray,
    }));
  };

 
  return (
    <div className="teacher-form-container">
      <h1 className="teacher-form-heading">Edit Teacher Information</h1>
      <form onSubmit={handleFormSubmit} className="teacher-form">
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
            <option value="PGT">PGT</option>
            <option value="TGT">TGT</option>
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
            {/* Add options dynamically as per your classes */}
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
            value={teacherData.subject.join(', ')} // Display subjects as a comma-separated string
            onChange={handleSubjectsChange}
            placeholder="Enter subjects separated by commas"
            required
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default TeacherEdit;
