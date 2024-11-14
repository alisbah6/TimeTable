import React, { useState } from 'react';
import './Classes.css';

const NurAndKg = () => {
  const subjectOptions = ['English', 'Hindi', 'Maths', 'EVS', 'Draw', 'Play', 'IS', 'Games', 'Urdu', 'Dic', 'Quran'];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = Array.from({ length: 6 }, (_, i) => `${i + 1}`);

  const [showTable, setShowTable] = useState(false);
  const [timetableData, setTimetableData] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();
    
    const generatedData = weekdays.map((day) => {
      const shuffledSubjects = shuffleSubjects();
      
      return Array.from({ length: 6 }, (_, index) => {
        let subject;
  
        // Restrict certain subjects from being in the first (index 0) and last (index 5) periods
        if (index === 0 || index === 5) {
          do {
            subject = shuffledSubjects.pop();
          } while (['Draw', 'Play', 'Games'].includes(subject));
        } else {
          subject = shuffledSubjects.pop();
        }
  
        // Special rule for Friday: keep the last period (index 5) empty
        if (day === 'Friday' && index === 5) return "";
  
        return subject;
      });
    });
  
    setTimetableData(generatedData);
    setShowTable(true);
  };
  

  // Shuffle subjects function to randomize the subject order
  const shuffleSubjects = () => {
    const shuffled = [...subjectOptions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
    }
    return shuffled;
  };

  return (
    <div>
      <h1 className="heading">Class Time Table</h1>
      <form className="teacher-form" onSubmit={handleGenerate}>
        <button className="generate-btn" type="submit">
          Generate
        </button>
      </form>

      {/* Show Table 1 */}
      {showTable && (
        <div>
          <h2>Class Timetable</h2>
          <table className="timetable">
            <thead>
              <tr>
                <th>Day</th>
                {periods.map((period) => <th key={period}>{period}</th>)}
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

      {/* Show Table 2 */}
      {showTable && (
        <div>
          <h2>Teachers Timetable</h2>
          <table className="timetable">
            <thead>
              <tr>
                <th>Day</th>
                {periods.map((period) => <th key={period}>{period}</th>)}
              </tr>
            </thead>
            <tbody>
              {timetableData.map((rowSubjects, dayIndex) => (
                <tr key={dayIndex}>
                  <td>{weekdays[dayIndex]}</td>
                  {rowSubjects.map((subject, index) => (
                    <td key={index}>
                      {subject === 'Games' || subject === 'Quran' ? "" : subject}
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

export default NurAndKg;
