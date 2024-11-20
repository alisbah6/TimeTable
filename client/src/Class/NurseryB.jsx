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
    { name: "Maths", count: 5 },
    { name: "Draw", count: 3 },
    { name: "Play", count: 4 },
    { name: "IS", count: 1 },
    { name: "EVS", count: 2 },
    { name: "Hindi", count: 3 },
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
  
    const newTimetable = timetableData.map((daySchedule, dayIndex) => {
      const usedSubjects = new Set(); // To track subjects used on the current day
  
      return daySchedule.map((subject, periodIndex) => {
        // Preserve already filled cells
        if (subject) {
          if (subjectCounts[subject] !== undefined) {
            subjectCounts[subject]--; // Deduct count for existing subjects
          }
          usedSubjects.add(subject); // Mark subject as used for the day
          return subject;
        }
  
        // Filter subjects based on remaining counts and restrictions
        let availableSubjects = Object.entries(subjectCounts)
          .filter(([name, count]) => count > 0) // Only subjects with remaining counts
          .filter(([name]) =>
            periodIndex === 0 || periodIndex === periods.length - 1
              ? !["Draw", "Play", "Games"].includes(name) // Restrict Draw, Play, Games for first/last periods
              : true
          )
          .map(([name]) => name);
  
        // Remove subjects with count less than 4 if they have already been used on the same day
        availableSubjects = availableSubjects.filter((subject) => {
          const subjectCount = subjectCounts[subject];
          if (subjectCount < 4 && usedSubjects.has(subject)) {
            return false; // Exclude subjects with count less than 4 that have been used
          }
          return true;
        });
  
        let selectedSubject = "";
  
        // Try to select a subject that is not the same as the previous one (no consecutive subjects)
        while (availableSubjects.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableSubjects.length);
          const candidateSubject = availableSubjects[randomIndex];
  
          // Ensure no consecutive subjects (don't pick the same subject as the previous period)
          if (
            periodIndex === 0 || // Skip check for the first period
            candidateSubject !== daySchedule[periodIndex - 1]
          ) {
            selectedSubject = candidateSubject;
            subjectCounts[selectedSubject]--; // Decrease the count for the selected subject
            usedSubjects.add(selectedSubject); // Mark subject as used for the day
            break;
          }
  
          // Remove invalid subject and retry
          availableSubjects.splice(randomIndex, 1);
        }
  
        // If no valid subject was found, select the one with the least remaining count, ensuring no consecutive subjects
        if (!selectedSubject) {
          console.warn(`Fallback: No valid subject found for Day: ${weekdays[dayIndex]}, Period: ${periodIndex + 1}`);
  
          // Find the subject with the least count remaining that is not the same as the previous one
          const leastCountSubject = Object.entries(subjectCounts)
            .filter(([name]) => 
              periodIndex === 0 || name !== daySchedule[periodIndex - 1] // Ensure no consecutive subjects
            )
            .reduce((minSubject, [name, count]) => {
              if (count < minSubject.count) {
                return { name, count };
              }
              return minSubject;
            }, { name: "", count: Infinity }); // Initialize with an infinite count
  
          selectedSubject = leastCountSubject.name; // Select the subject with the least remaining count
          subjectCounts[selectedSubject]--; // Deduct count for the selected subject
          usedSubjects.add(selectedSubject); // Mark subject as used for the day
        }
  
        return selectedSubject;
      });
    });
  
    setTimetableData(newTimetable);
  };
  
  
  const generateQuranTimetable = () => {
    // Get quran positions from localStorage
    const NurAquran = JSON.parse(localStorage.getItem("NurAquran")) || [];
  
    // Create a copy of the timetable with all cells empty
    const timetableCopy = timetableData.map((daySchedule) =>
      daySchedule.map((subject) => (subject === "Quran" ? "Quran" : ""))
    );
  
    // Set "Quran" in the positions stored in quranPositions
    NurAquran.forEach(({ row, col }) => {
      if (timetableCopy[row] && timetableCopy[row][col] !== undefined) {
        timetableCopy[row][col] = "Quran"; // Set "Quran" at the correct position
      }
    });
  
    return timetableCopy;
  };
  
  const quranTimetable = generateQuranTimetable();

  const sharequranposition = () => {
    // Generate the timetable with Quran
    const updatedTimetable = generateQuranTimetable();
  
    // Capture the positions of "Quran" in the updated timetable
    const QuranPositions = [];
    updatedTimetable.forEach((row, rowIndex) => {
      row.forEach((subject, colIndex) => {
        if (subject === "Quran") {
          QuranPositions.push({ row: rowIndex, col: colIndex });
        }
      });
    });
  
    // Store the Quran positions in localStorage (only the row, col data)
    localStorage.setItem("UpdatedTimetable", JSON.stringify(QuranPositions));
  
    // Optionally, update the state to reflect the updated timetable
    setTimetableData(updatedTimetable);
  
    // Navigate to the next page
    navigate("/");
  };
  
  return (
    <div>
      <h1 className="heading">NurseryB Time Table</h1>
      <button className="generate-btn" onClick={sharequranposition}>
        Home
      </button>
      <button className="generate-btn" onClick={handleGenerate}>
        Generate
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
