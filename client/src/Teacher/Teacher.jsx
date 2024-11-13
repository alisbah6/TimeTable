import React, { useState } from 'react';
import './Teacher.css';

const Teacher = () => {
  const classOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sectionOptions = ['A', 'B', 'C', 'D', 'E', 'F'];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = Array.from({ length: 8 }, (_, i) => `${i + 1}`);

  const [selectedClass1, setSelectedClass1] = useState('');
  const [selectedClass2, setSelectedClass2] = useState('');
  const [selectedClass3, setSelectedClass3] = useState('');
  const [selectedSection1, setSelectedSection1] = useState('');
  const [selectedSection2, setSelectedSection2] = useState('');
  const [selectedSection3, setSelectedSection3] = useState('');
  const [selectedSection4, setSelectedSection4] = useState('');
  const [selectedSection5, setSelectedSection5] = useState('');
  const [selectedSection6, setSelectedSection6] = useState('');
  const [selectedSection7, setSelectedSection7] = useState('');
  const [selectedSection8, setSelectedSection8] = useState('');
  const [selectedSection9, setSelectedSection9] = useState('');
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
      if (selectedSection3) selectedClassesSections.push(`${selectedClass1}${selectedSection3}`);
    }
  
    if (selectedClass2) {
      if (selectedSection4) selectedClassesSections.push(`${selectedClass2}${selectedSection4}`);
      if (selectedSection5) selectedClassesSections.push(`${selectedClass2}${selectedSection5}`);
      if (selectedSection6) selectedClassesSections.push(`${selectedClass2}${selectedSection6}`);
    }
  
    if (selectedClass3) {
      if (selectedSection7) selectedClassesSections.push(`${selectedClass3}${selectedSection7}`);
      if (selectedSection8) selectedClassesSections.push(`${selectedClass3}${selectedSection8}`);
      if (selectedSection9) selectedClassesSections.push(`${selectedClass3}${selectedSection9}`);
    }
  
    // If there are no valid combinations, return an empty string for a blank
    if (selectedClassesSections.length === 0) {
      return ""; // Leave it blank if no combination is available
    }
  
    // Randomly select a class-section combination
    const randomIndex = Math.floor(Math.random() * selectedClassesSections.length);
    return selectedClassesSections[randomIndex];
  };
  
  return (
    <div>
      <h1 className="heading">Teachers Time Table</h1>
      <form className="teacher-form" onSubmit={handleGenerate}>
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
            <label className="classes">Section</label>
            <select
              className="class-options"
              value={selectedSection3}
              onChange={(e) => setSelectedSection3(e.target.value)}
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
        <div className="first">
          <div className="class-section">
            <label className="classes">Class</label>
            <select
              className="class-options"
              value={selectedClass3}
              onChange={(e) => setSelectedClass3(e.target.value)}
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
              value={selectedSection7}
              onChange={(e) => setSelectedSection7(e.target.value)}
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
              value={selectedSection8}
              onChange={(e) => setSelectedSection8(e.target.value)}
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
              value={selectedSection9}
              onChange={(e) => setSelectedSection9(e.target.value)}
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
        {periods.map((period) => (
          <th key={period}>{period}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {weekdays.map((day) => {
        // Step 1: Randomly select periods to be empty (either 1 or 2 periods)
        const emptyPeriods = new Set();
        const periodsToLeaveEmpty = Math.random() < 0.5 ? 2 : 1; // Randomly decide if 1 or 2 periods should be empty

        while (emptyPeriods.size < periodsToLeaveEmpty) {
          const randomIndex = Math.floor(Math.random() * periods.length);
          emptyPeriods.add(randomIndex); // Ensure unique periods are chosen to be empty
        }

        return (
          <tr key={day}>
            <td>{day}</td>
            {periods.map((_, index) => (
              <td key={index}>
                {/* Step 2: If the current period is in the emptyPeriods set, leave it blank */}
                {emptyPeriods.has(index) ? "" : getRandomClassSection()}
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

export default Teacher;
