import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Classes.css";

const KgB = () => {
  const navigate = useNavigate();
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = Array.from({ length: 6 }, (_, i) => `${i + 1}`);

  const subjectOptions = [
    { name: "English", count: 5 },
    { name: "Maths", count: 5 },
    { name: "Draw", count: 2 },
    { name: "Play", count: 4 },
    { name: "IS", count: 1 },
    { name: "EVS", count: 2 },
    { name: "Hindi", count: 4 },
    { name: "Games", count: 1 },
    { name: "Urdu", count: 3 },
    { name: "Dic", count: 1 },
    { name: "Quran", count: 2 },
  ];

  const [timetableData, setTimetableData] = useState([]);
  const [quranTimetable, setQuranTimetable] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleGenerate = () => {
    const subjectCounts = subjectOptions.reduce((acc, { name, count }) => {
      acc[name] = count;
      return acc;
    }, {});
  
    const newTimetable = weekdays.map(() => {
      const usedSubjects = new Set();
      const dailySubjectCount = {};  // Track how many times a subject is used on a specific day
  
      return periods.map((_, periodIndex) => {
        let availableSubjects = Object.entries(subjectCounts)
          .filter(([name, count]) => count > 0)
          .filter(([name]) =>
            periodIndex === 0 || periodIndex === periods.length - 1
              ? !["Draw", "Play", "Games"].includes(name)
              : true
          )
          .map(([name]) => name);
  
        // Exclude subjects that would cause a repeat within the same day
        availableSubjects = availableSubjects.filter((subject) => {
          const subjectCount = subjectCounts[subject];
          const subjectAlreadyUsed = usedSubjects.has(subject);
          const subjectLimitCheck = subjectCount < 3 && dailySubjectCount[subject] >= 1;
          
          return !(subjectAlreadyUsed || subjectLimitCheck);
        });
  
        // Select a subject that is not the same as the previous period's subject
        let selectedSubject = "";
        while (availableSubjects.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableSubjects.length);
          const candidateSubject = availableSubjects[randomIndex];
  
          // Ensure no same subject as the previous period (no adjacent same subject)
          if (periodIndex === 0 || candidateSubject !== timetableData[periodIndex - 1]) {
            selectedSubject = candidateSubject;
            subjectCounts[selectedSubject]--;
            usedSubjects.add(selectedSubject);
            dailySubjectCount[selectedSubject] = (dailySubjectCount[selectedSubject] || 0) + 1; // Track usage per day
            break;
          }
  
          availableSubjects.splice(randomIndex, 1);
        }
  
        if (!selectedSubject) {
          console.warn(`Fallback: No valid subject found for Period: ${periodIndex + 1}`);
          const leastCountSubject = Object.entries(subjectCounts)
            .filter(([name]) => periodIndex === 0 || name !== timetableData[periodIndex - 1])
            .reduce((minSubject, [name, count]) => {
              if (count < minSubject.count) {
                return { name, count };
              }
              return minSubject;
            }, { name: "", count: Infinity });
  
          selectedSubject = leastCountSubject.name;
          subjectCounts[selectedSubject]--;
          usedSubjects.add(selectedSubject);
          dailySubjectCount[selectedSubject] = (dailySubjectCount[selectedSubject] || 0) + 1;
        }
  
        return selectedSubject;
      });
    });
  
    setTimetableData(newTimetable);
    setShowTable(true);
  
    // After generating the main timetable, generate the Quran timetable
    generateQuranTimetable(newTimetable);
  };
  

  const generateQuranTimetable = (generatedTimetable) => {
    const quranposition = JSON.parse(localStorage.getItem("KgA")) || [];

    const timetableCopy = generatedTimetable.map((daySchedule) =>
      daySchedule.map((subject) => (subject === "Quran" ? "Quran" : ""))
    );

    console.log("Initial timetable copy (empty):", timetableCopy);

    // Add existing Quran positions first
    quranposition.forEach(({ row, col }) => {
      if (timetableCopy[row] && timetableCopy[row][col] !== undefined) {
        timetableCopy[row][col] = "Quran";
      }
    });

    // Handle new Quran subject placement
    const availablePositions = [];
    timetableCopy.forEach((row, rowIndex) => {
      row.forEach((subject, colIndex) => {
        if (subject !== "Quran") {
          availablePositions.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    console.log("Updated timetable with Quran positions:", timetableCopy);
    setQuranTimetable(timetableCopy);
    localStorage.setItem("KgA", JSON.stringify(timetableCopy));
  };

  return (
    <div>
      <h1 className="heading">Kg B Time Table</h1>
      <button className="generate-btn" onClick={()=>{navigate('/')}}>
        Home
      </button>
      <button className="generate-btn" onClick={handleGenerate}>
        Generate
      </button>

      {showTable && (
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
        </>
      )}

      {quranTimetable.length > 0 && (
        <>
          <h2>Subject Teacher Time Table (Quran)</h2>
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
      )}
    </div>
  );
};

export default KgB;
