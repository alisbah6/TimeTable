import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home/Home';
import Teacher from './Teacher/Teacher';
import NurseryA from './Class/NurseryA';
import NurseryB from './Class/NurseryB';
import KgA from './Class/KgA';
import FirstAndSecond from './Class/FirstAndSecond';
import ThirdToFifth from './Class/ThirdToFifth';
import Six from './Class/Six';
import SevenToEight from './Class/SevenToEight';
import NineAndTen from './Class/NineAndTen';
import ElevenToTwelve from './Class/ElevenAndTwelve';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Teacher" element={<Teacher />} />
        <Route path="/NurseryA" element={<NurseryA />} />
        <Route path="/NurseryB" element={<NurseryB />} />
        <Route path="/KgA" element={<KgA />} />
        <Route path="/FirstAndSecond" element={<FirstAndSecond />} />
        <Route path="/ThirdToFifth" element={<ThirdToFifth />} />
        <Route path="/Six" element={<Six />} />
        <Route path="/SevenToEight" element={<SevenToEight />} />
        <Route path="/NineAndTen" element={<NineAndTen />} />
        <Route path="/ElevenToTwelve" element={<ElevenToTwelve />} />
      </Routes>
  </Router>
  );
}

export default App;
