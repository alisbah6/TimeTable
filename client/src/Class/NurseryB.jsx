import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Classes.css";

const NurseryB = () => {
  const navigate = useNavigate();
  const initialTimetableData =
    JSON.parse(localStorage.getItem("copiedTableData")) || [];
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = Array.from({ length: 6 }, (_, i) => `${i + 1}`);

  const subjectOptions = [
    { name: "English", count: 5 },
    { name: "Hindi", count: 3 },
    { name: "Maths", count: 5 },
    { name: "EVS", count: 2 },
    { name: "Draw", count: 3 },
    { name: "Play", count: 4 },
    { name: "IS", count: 1 },
    { name: "Games", count: 1 },
    { name: "Urdu", count: 3 },
    { name: "Dic", count: 1 },
    { name: "Quran", count: 2 },
  ];

  const [timetableData, setTimetableData] = useState(initialTimetableData);

  const handleGenerate = () => {
    const subjectCounts = subjectOptions.reduce((acc, { name, count }) => {
      acc[name] = count;
      return acc;
    }, {});

    const newTimetable = timetableData.map((daySchedule, dayIndex) =>
      daySchedule.map((subject, periodIndex) => {
        // Preserve filled cells
        if (subject) {
          if (subjectCounts[subject] !== undefined) {
            subjectCounts[subject]--; // Deduct count for existing subjects
          }
          return subject;
        }


        // Filter subjects based on remaining counts and restrictions
        const availableSubjects = Object.entries(subjectCounts)
          .filter(([name, count]) => count > 0)
          .filter(([name]) =>
            periodIndex === 0 || periodIndex === periods.length - 1 // Restrict Draw, Play, Games for first/last periods
              ? !["Draw", "Play", "Games"].includes(name)
              : true
          )
          .map(([name]) => name);

        let selectedSubject = "";
        while (availableSubjects.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * availableSubjects.length
          );
          const candidateSubject = availableSubjects[randomIndex];

          // Ensure no consecutive same subjects
          if (
            periodIndex === 0 ||
            candidateSubject !== daySchedule[periodIndex - 1]
          ) {
            selectedSubject = candidateSubject;
            subjectCounts[selectedSubject]--;
            break;
          }

          // Remove invalid subject
          availableSubjects.splice(randomIndex, 1);
        }

        return selectedSubject;
      })
    );
    const quranPositions = JSON.parse(localStorage.getItem("quranPositions"));

// Initialize an array to hold the subjects (excluding Quran) at those positions
const otherSubjects = [];

// Iterate over the Quran positions and get other subjects
quranPositions.forEach(({ row, col }) => {
  const subjectAtPosition = timetableData[row][col];
  // If the subject is not "Quran", add it to the otherSubjects array
  if (subjectAtPosition !== "Quran") {
    otherSubjects.push(subjectAtPosition);
  }
});

    setTimetableData(newTimetable);
  }; 
  
  
  const handleRegenerate = () => {
    window.location.reload();
  };

  const generateQuranTimetable = () => {
    return timetableData.map((daySchedule) =>
      daySchedule.map((subject) => (subject === "Quran" ? "Quran" : ""))
    );
  };

  const quranTimetable = generateQuranTimetable();

  return (
    <div>
      <h1 className="heading">NurseryB Time Table</h1>
      <button className="generate-btn" onClick={() => navigate("/")}>
        Home
      </button>
      <button className="generate-btn" onClick={handleGenerate}>
        Generate
      </button>
      <button className="generate-btn" onClick={handleRegenerate}>
        Reload
      </button>
      {timetableData.length > 0 ? (
        <>
          <h2>Class Teacher Time Table</h2>
          <table className="timetable">
            <thead>
              <tr>
                <th>Day</th>
                {periods.map((period) => (
                  <th key={period}>{period}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetableData.map((rowSubjects, dayIndex) => (
                <tr key={dayIndex}>
                  <td>{weekdays[dayIndex]}</td>
                  {rowSubjects.map((subject, index) => (
                    <td key={index}>{subject}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Subject Teacher Time Table</h2>
          <table className="timetable">
            <thead>
              <tr>
                <th>Day</th>
                {periods.map((period) => (
                  <th key={period}>{period}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quranTimetable.map((rowSubjects, dayIndex) => (
                <tr key={dayIndex}>
                  <td>{weekdays[dayIndex]}</td>
                  {rowSubjects.map((subject, index) => (
                    <td key={index}>{subject}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>
          No data available to display. Please go back and copy the table again.
        </p>
      )}
    </div>
  );
};

export default NurseryB;
