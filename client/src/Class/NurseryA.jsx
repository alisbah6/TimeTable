import React, { useState ,useContext} from "react";
import { RecoveryContext } from '../App';
import "./Classes.css";
import { useNavigate } from "react-router-dom";

const NurseryA = () => {
  const { teachers, selectedTeacher, setSelectedTeacher } = useContext(RecoveryContext);

  const navigate = useNavigate();
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
      const usedSubjects = new Set(); // To track subjects used on the current day

      for (let index = 0; index < periods.length; index++) {
        let subject = null;

        // Filter subjects dynamically based on remaining counts and restrictions
        let availableSubjects = Object.entries(subjectCounts)
          .filter(([name, count]) => count > 0) // Only include subjects with remaining count
          .filter(([name]) =>
            index === 0 || index === periods.length - 1 // Restrict Draw, Play, Games for first/last periods
              ? !["Draw", "Play", "Games"].includes(name)
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

        // If no available subjects are left, find the one with the least count
        if (availableSubjects.length === 0) {
          // Find the subject with the least remaining count
          const leastUsedSubject = Object.entries(subjectCounts)
            .filter(([name, count]) => count > 0) // Only consider subjects with remaining count
            .filter(
              ([name]) => index === 0 || name !== daySchedule[index - 1] // Ensure no consecutive subjects
            )
            .reduce((prev, curr) => (prev[1] < curr[1] ? prev : curr))[0]; // Get the one with the least count

          subject = leastUsedSubject; // Assign the least used subject
          subjectCounts[subject]--; // Decrease its count
          usedSubjects.add(subject); // Mark subject as used for the day
        } else {
          // Randomly select a subject that is not the same as the previous one
          while (availableSubjects.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * availableSubjects.length
            );
            const candidateSubject = availableSubjects[randomIndex];

            if (
              index === 0 || // Skip check for the first period
              candidateSubject !== daySchedule[index - 1] // Ensure no consecutive subjects
            ) {
              subject = candidateSubject;
              subjectCounts[subject]--; // Decrease the count for the selected subject
              usedSubjects.add(subject); // Mark subject as used for the day
              break;
            }

            // Remove the candidate subject if it fails the condition
            availableSubjects.splice(randomIndex, 1);
          }
        }

        daySchedule.push(subject); // This ensures that a valid subject is always pushed
      }

      return daySchedule;
    });

    setTimetableData(generatedData);
    setShowTable(true);
  };

  const handleCopyTable = () => {
    const NurAquran = [];

    timetableData.forEach((row, rowIndex) => {
      row.forEach((subject, colIndex) => {
        if (subject === "Quran") {
          NurAquran.push({ row: rowIndex, col: colIndex, value: subject });
        }
      });
    });

    // Save Quran positions to localStorage
    localStorage.setItem("NurAquran", JSON.stringify(NurAquran));

    // Optionally, you can also copy the table data with "Games" as it is, and empty others
    const copiedData = timetableData.map((row) =>
      row.map((subject) => (subject === "Games" ? subject : ""))
    );
    localStorage.setItem("copiedTableData", JSON.stringify(copiedData));

    // Navigate to the next page
    navigate("/NurseryB");
  };
  const nurseryTeachers = teachers.filter(teacher => teacher.teacherclass==="Nursery" & teacher.type==="Class Teacher");
  const quranTeacher = teachers.filter(
    teacher => teacher.teacherclass === "Nursery" && teacher.type === "Subject Teacher"
  );  
  const handleSelectChange = (event) => {
    setSelectedTeacher(event.target.value);
  };
  return (
    <div>
      <h1 className="heading">NurseryA Time Table</h1>
      <button className="generate-btn" onClick={() => navigate("/")}>
        Home
      </button>
      <h3>Select a Nursery Teacher</h3>
      <select value={selectedTeacher} onChange={handleSelectChange}>
        <option value="">Select Teacher</option>
        {nurseryTeachers.map(teacher => (
          <option key={teacher.name} value={teacher.name}>
            {teacher.name}
          </option>
        ))}
      </select>
      {selectedTeacher && (
        <div>
          <h4>Selected Teacher: {selectedTeacher}</h4>
        </div>
      )}
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
          <h2>{selectedTeacher}</h2>
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
     <h2>Subject Teacher 1</h2>
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
                      {[
                        "English",
                        "Hindi",
                        "Maths",
                        "EVS",
                        "Draw",
                        "Play",
                        "IS",
                        "Urdu",
                        "Dic",
                        "Quran",
                      ].includes(subject)
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
          subject teacher 2
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
