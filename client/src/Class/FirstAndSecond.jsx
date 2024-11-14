import React, { useState } from 'react';
import './Classes.css';

const FirstAndSecond = () => {
  const classOptions = ['I','II'];
  const sectionOptions = ['A', 'B', 'C','D'];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = Array.from({ length: 7 }, (_, i) => `${i + 1}`);

  const [classTeacher,setClassTeacher]=useState(' ');
  const [selectedClass0, setSelectedClass0] = useState('');
  const [selectedClass1, setSelectedClass1] = useState('');
  const [selectedClass2, setSelectedClass2] = useState('');
  const [selectedSection0, setSelectedSection0] = useState('');
  const [selectedSection1, setSelectedSection1] = useState('');
  const [selectedSection2, setSelectedSection2] = useState('');
  const [selectedSection4, setSelectedSection4] = useState('');
  const [selectedSection5, setSelectedSection5] = useState('');
  const [selectedSection6, setSelectedSection6] = useState('');
  const [showTable, setShowTable] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setShowTable(true);
  };

  // Helper function to randomly pick one of the selected class-section combinations
  const getRandomClassSection = () => {
    // Create an array of selected class-section combinations
    const selectedClassesSections = [];

    if (selectedClass1) {
      if (selectedSection1) selectedClassesSections.push(`${selectedClass1}${selectedSection1}`);
      if (selectedSection2) selectedClassesSections.push(`${selectedClass1}${selectedSection2}`);
    }
  
    if (selectedClass2) {
      if (selectedSection4) selectedClassesSections.push(`${selectedClass2}${selectedSection4}`);
      if (selectedSection5) selectedClassesSections.push(`${selectedClass2}${selectedSection5}`);
      if (selectedSection6) selectedClassesSections.push(`${selectedClass2}${selectedSection6}`);
    }
  
  
    // if (selectedClassesSections.length === 0) {
    //   return ""; // Leave it blank if no combination is available
    // }
  
    // Randomly select a class-section combination
    const randomIndex = Math.floor(Math.random() * selectedClassesSections.length);
    return selectedClassesSections[randomIndex];
  };
  
  return (
    <div>
      <h1 className="heading">Teachers Time Table</h1>
      <form className="teacher-form" onSubmit={handleGenerate}>
        <label className="classes">Teacher's Name</label>
        <input onChange={(e) => setClassTeacher(e.target.value)} /> 
        <div className="first">
          <h2>Class Teacher Of</h2>
          <div className="class-section">
            <label className="classes">Class</label>
            <select
              className="class-options"
              value={selectedClass0}
              onChange={(e) => setSelectedClass0(e.target.value)}
            >
              <option value="">Select Class</option>
              {classOptions.map((classItem) => (
                <option key={classItem} value={classItem}>
                  {classItem}
                </option>
              ))}
            </select>
            <label className="classes">Section</label>
            <select
              className="class-options"
              value={selectedSection0}
              onChange={(e) => setSelectedSection0(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionOptions.map((sectionItem) => (
                <option key={sectionItem} value={sectionItem}>
                  {sectionItem}
                </option>
              ))}
            </select>
            </div>
            </div>
        <div className="first">
          <div className="class-section">
            <label className="classes">Class</label>
            <select
              className="class-options"
              value={selectedClass1}
              onChange={(e) => setSelectedClass1(e.target.value)}
            >
              <option value="">Select Class</option>
              {classOptions.map((classItem) => (
                <option key={classItem} value={classItem}>
                  {classItem}
                </option>
              ))}
            </select>
            <label className="classes">Section</label>
            <select
              className="class-options"
              value={selectedSection1}
              onChange={(e) => setSelectedSection1(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionOptions.map((sectionItem) => (
                <option key={sectionItem} value={sectionItem}>
                  {sectionItem}
                </option>
              ))}
            </select>
            <label className="classes">Section</label>
            <select
              className="class-options"
              value={selectedSection2}
              onChange={(e) => setSelectedSection2(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionOptions.map((sectionItem) => (
                <option key={sectionItem} value={sectionItem}>
                  {sectionItem}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="first">
          <div className="class-section">
            <label className="classes">Class</label>
            <select
              className="class-options"
              value={selectedClass2}
              onChange={(e) => setSelectedClass2(e.target.value)}
            >
              <option value="">Select Class</option>
              {classOptions.map((classItem) => (
                <option key={classItem} value={classItem}>
                  {classItem}
                </option>
              ))}
            </select>
            <label className="classes">Section</label>
            <select
              className="class-options"
              value={selectedSection4}
              onChange={(e) => setSelectedSection4(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionOptions.map((sectionItem) => (
                <option key={sectionItem} value={sectionItem}>
                  {sectionItem}
                </option>
              ))}
            </select>
            <label className="classes">Section</label>
            <select
              className="class-options"
              value={selectedSection5}
              onChange={(e) => setSelectedSection5(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionOptions.map((sectionItem) => (
                <option key={sectionItem} value={sectionItem}>
                  {sectionItem}
                </option>
              ))}
            </select>
            <label className="classes">Section</label>
            <select
              className="class-options"
              value={selectedSection6}
              onChange={(e) => setSelectedSection6(e.target.value)}
            >
              <option value="">Select Section</option>
              {sectionOptions.map((sectionItem) => (
                <option key={sectionItem} value={sectionItem}>
                  {sectionItem}
                </option>
              ))}
            </select>
          </div>
        </div>
       
        <button className="generate-btn" type="submit">
          Generate
        </button>
      </form>

      {showTable && (
        <table className="timetable">
          <thead>
            <tr>
              <th>Day</th>
              {periods.map((period) => <th key={period}>{period}</th>)}
            </tr>
          </thead>
          <tbody>
            {weekdays.map((day) => {
              const classTeacherClassSection = `${selectedClass0}${selectedSection0}`;
              const emptyPeriods = new Set();

              if (day === 'Friday') {
                // Friday-specific logic
                const randomEmptyPeriod = Math.floor(Math.random() * 4) + 1; // Randomly select a period between 2-5 (index 1-4)
                emptyPeriods.add(randomEmptyPeriod);
                emptyPeriods.add(periods.length - 1); // Ensure the last period is empty
              } else {
                // Logic for other days
                const periodsToLeaveEmpty = Math.random() < 0.5 ? 2 : 1;
                while (emptyPeriods.size < periodsToLeaveEmpty) {
                  const randomIndex = Math.floor(Math.random() * (periods.length - 1)) + 1; // Avoid the first period
                  emptyPeriods.add(randomIndex);
                }
              }

              return (
                <tr key={day}>
                  <td>{day}</td>
                  {periods.map((_, index) => (
                    <td key={index}>
                      {index === 0
                        ? classTeacherClassSection // First period set to class teacher's class-section
                        : emptyPeriods.has(index)
                        ? ""
                        : getRandomClassSection()}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

    </div>
  );
};

export default FirstAndSecond;
