// Home.js
import React from "react";
import "./Home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const classes = [
    "Nursery",
    "Kg",
    "I & II",
    "III to V",
    "VI",
    "VII-VIII",
    "IX-X",
    "XI-XII",
  ];

  const handleCardClick = (classItem) => {
    if (classItem === "Nursery") {
      navigate("/NurseryA");
    }
    else if(classItem==="Kg"){
      navigate("/KgA");
    }
     else if (classItem === "I & II") {
      navigate("/FirstAndSecond");
    }
    else if (classItem === "III to V") {
      navigate("/ThirdToFifth");
    }
    else if (classItem === "VI") {
      navigate("/Six");
    }
    else if (classItem === "VII-VIII") {
      navigate("/SevenAndEight");
    }
    else if (classItem === "IX-X") {
      navigate("/NineAndTen");
    }
    else if (classItem === "XI-XII") {
      navigate("/ElevenAndTwelve");
    }

  };

  return (
    <div>
      <h1 className="heading1">Shaheen Bagh School</h1>
      <button className="teacher-btn" onClick={()=>navigate("/AllTeacher")}>Teacher</button>
      <h1 className="heading3">Select Class</h1>
      <div className="Allclasses">
        {classes.map((classItem) => (
          <div
            className="class-card"
            key={classItem}
            data-value={classItem}
            onClick={() => handleCardClick(classItem)} // Pass classItem here
          >
            <p className="class-title">{classItem}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
