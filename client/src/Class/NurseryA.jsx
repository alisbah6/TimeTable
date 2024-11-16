import React, { useState } from "react";
import "./Classes.css";
import {  useNavigate } from "react-router-dom";

const NurseryA = () => {
  const navigate = useNavigate();
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
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = Array.from({ length: 6 }, (_, i) => `${i + 1}`);

  const [showTable, setShowTable] = useState(false);
  const [timetableData, setTimetableData] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();
  
    const subjectCounts = subjectOptions.reduce((acc, { name, count }) => {
      acc[name] = count;
      return acc;
    }, {});
  
    const generatedData = weekdays.map((day, dayIndex) => {
      const daySchedule = [];
  
      for (let index = 0; index < periods.length; index++) {
        let subject = null;
  
        // Filter subjects dynamically based on remaining counts and restrictions
        const availableSubjects = Object.entries(subjectCounts)
          .filter(([name, count]) => count > 0) // Only include subjects with remaining count
          .filter(([name]) =>
            index === 0 || index === periods.length - 1 // Restrict Draw, Play, Games for first/last periods
              ? !["Draw", "Play", "Games"].includes(name)
              : true
          )
          .map(([name]) => name);
  
        if (availableSubjects.length === 0) {
          // If there are no available subjects left, reset subject counts (or handle as needed)
          Object.entries(subjectCounts).forEach(([name, count]) => {
            subjectCounts[name] = subjectOptions.find((subject) => subject.name === name).count;
          });
        }
  
        // Randomly select a subject that is not the same as the previous one
        while (availableSubjects.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableSubjects.length);
          const candidateSubject = availableSubjects[randomIndex];
  
          if (index === 0 || candidateSubject !== daySchedule[index - 1]) {
            subject = candidateSubject;
            subjectCounts[subject]--; // Decrease the count for the selected subject
            break;
          }
  
          // Remove the candidate subject if it fails the condition
          availableSubjects.splice(randomIndex, 1);
        }
  
        daySchedule.push(subject || ""); // This ensures that if subject is null, it will be an empty string
      }
  
  
      return daySchedule;
    });
  
    setTimetableData(generatedData);
    setShowTable(true);
  };
  
  
  // const handleCopyTable = () => {
  //   const copiedData = timetableData.map((row) =>
  //     row.map((subject) => (subject === "Games" ? subject : ""))
  //   );
  //   localStorage.setItem("copiedTableData", JSON.stringify(copiedData));
  //   navigate('/NurseryB');}
  const handleCopyTable = () => {
    const quranPositions = [];
  
    // Loop through timetableData and store positions of 'Quran'
    timetableData.forEach((row, rowIndex) => {
      row.forEach((subject, colIndex) => {
        if (subject === "Quran") {
          quranPositions.push({ row: rowIndex, col: colIndex });
        }
      });
    });
  
    // Save Quran positions to localStorage
    localStorage.setItem("quranPositions", JSON.stringify(quranPositions));
  
    // Optionally, you can also copy the table data with "Games" as it is, and empty others
    const copiedData = timetableData.map((row) =>
      row.map((subject) => (subject === "Games" ? subject : ""))
    );
    localStorage.setItem("copiedTableData", JSON.stringify(copiedData));
  
    // Navigate to the next page
    navigate('/NurseryB');
  };
  
  return (
    <div>
      <h1 className="heading">NurseryA Time Table</h1>
      <button className="generate-btn" onClick={() => navigate("/")}>
        Home
      </button>
      <form className="teacher-form" onSubmit={handleGenerate}>
        <button className="generate-btn" type="submit">
          Generate
        </button>
      </form>

      {/* Show Table 1: Class Timetable */}
      {showTable && (
        <div>
          <h2>Class Timetable</h2>
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
        </div>
      )}

      {/* Show Table 2: Class Teachers Timetable */}
      {showTable && (
        <div>
          <h2>Class Teachers Timetable</h2>
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
                    <td key={index}>
                      {/* For Teachers Table, omit Games and Quran */}
                      {subject === "Games" || subject === "Quran"
                        ? ""
                        : subject}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Show Table 2: Subject1 Teachers Timetable */}
      {showTable && (
        <div>
          <h2>Subject Teacher 1 Timetable</h2>
          <button className="generate-btn" onClick={handleCopyTable}>
            Use
          </button>
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
                    <td key={index}>
                      {["English", "Hindi", "Maths", "EVS", "Draw", "Play", "IS", "Urdu", "Dic", "Quran"].includes(
                        subject
                      )
                        ? ""
                        : subject}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        {/* Show Table 2: Subject1 Teachers Timetable */}
        {showTable && (
        <div>
          <h2>Subject Teacher 2 Timetable</h2>
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
                    <td key={index}>
                      {/* For Teachers Table, omit Games and Quran */}
                      {subject === "English" ||
                      subject === "Hindi" ||
                      subject === "Maths" ||
                      subject === "EVS" ||
                      subject === "Draw" ||
                      subject === "Play" ||
                      subject === "IS" ||
                      subject === "Urdu" ||
                      subject === "Dic" ||
                      subject === "Games" 
                        ? ""
                        : subject}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NurseryA;
