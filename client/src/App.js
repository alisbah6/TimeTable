import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home/Home';
import Teacher from './Teacher/Teacher';
import Class from './Class/Class';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Teacher" element={<Teacher />} />
        <Route path="/Class" element={<Class />} />
      </Routes>
  </Router>
  );
}

export default App;
