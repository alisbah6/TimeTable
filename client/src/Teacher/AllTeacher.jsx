import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import './Teacher.css';

const AllTeacher = () => {
  const { teachers, setTeachers,loading,  } = useContext(RecoveryContext);
  const navigate = useNavigate(); // For navigating to the edit page

  // Function to delete a teacher
  const handleDelete = async (teacherId) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        const response = await fetch(`http://localhost:3200/teacher/delete/${teacherId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete teacher");
        }

        // Remove the deleted teacher from state
        setTeachers(teachers.filter((teacher) => teacher._id !== teacherId));
        alert("Teacher deleted successfully!");
      } catch (error) {
        console.error("Error deleting teacher:", error);
        alert("Failed to delete teacher.");
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="teachers-list-container">
      <nav className="teacher-nav">
        <NavLink to="/" className="teacher-info-link">Home</NavLink>
        <NavLink to="/Teacher" className="teacher-info-link">Teacher Information Form</NavLink>
      </nav>
      <h1 className="list-heading">Teachers List</h1>

      {teachers.length > 0 ? (
        <table className="teachers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Level</th>
              <th>Class</th>
              <th>Subjects</th>
              <th>Actions</th> {/* Add a column for actions */}
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.type}</td>
                <td>{teacher.level}</td>
                <td>{teacher.teacherclass}</td>
                <td>{teacher.subject.join(", ")}</td> {/* Display subjects as a comma-separated string */}
                <td>
                  {/* Edit Button */}
                  <button
                    className="edit-button"
                    onClick={() => {
                      if (teacher._id) {
                        navigate(`/TeacherEdit/${teacher._id}`);
                        console.log("Selected teacher:", teacher._id);
                      } else {
                        alert('Invalid teacher ID'); // Optional alert for edge cases
                      }
                    }}
                    disabled={!teacher._id} // Disable button if _id is missing
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(teacher._id)}
                    disabled={!teacher._id} // Disable button if _id is missing
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-teachers">No teachers found.</p>
      )}
    </div>
  );
};

export default AllTeacher;
