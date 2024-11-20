import './App.css';
import { useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { createContext } from "react";
import { CartProvider } from "./Resources/CartContext.jsx";
import Home from './Home/Home';
import Teacher from './Teacher/Teacher';
import AllTeacher from './Teacher/AllTeacher';
import TeacherEdit from './Teacher/TeacherEdit';
import NurseryA from './Class/NurseryA';
import NurseryB from './Class/NurseryB';
import KgA from './Class/KgA';
import KgB from './Class/KgB';
import FirstAndSecond from './Class/FirstAndSecond';
import ThirdToFifth from './Class/ThirdToFifth';
import Six from './Class/Six';
import SevenToEight from './Class/SevenToEight';
import NineAndTen from './Class/NineAndTen';
import ElevenToTwelve from './Class/ElevenAndTwelve';
export const RecoveryContext = createContext();
function App() {
  const [teachers, setTeachers] = useState([]); // State to store teachers data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [selectedTeacher, setSelectedTeacher] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3200/teacher/all"); // API endpoint to fetch teachers
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTeachers(data); // Set the fetched teachers in state
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchTeachers();
  }, []);

  return (
    <CartProvider>
    <RecoveryContext.Provider
    value={{ teachers,setTeachers,loading,setLoading,selectedTeacher, setSelectedTeacher }}>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Teacher" element={<Teacher />} />
        <Route path="/AllTeacher" element={<AllTeacher />} />
        <Route path="/TeacherEdit/:id" element={<TeacherEdit />} />
        <Route path="/NurseryA" element={<NurseryA />} />
        <Route path="/NurseryB" element={<NurseryB />} />
        <Route path="/KgA" element={<KgA />} />
        <Route path="/KgB" element={<KgB/>} />
        <Route path="/FirstAndSecond" element={<FirstAndSecond />} />
        <Route path="/ThirdToFifth" element={<ThirdToFifth />} />
        <Route path="/Six" element={<Six />} />
        <Route path="/SevenToEight" element={<SevenToEight />} />
        <Route path="/NineAndTen" element={<NineAndTen />} />
        <Route path="/ElevenToTwelve" element={<ElevenToTwelve />} />
      </Routes>
  </Router>
  </RecoveryContext.Provider>
  </CartProvider>
  );
}

export default App;
