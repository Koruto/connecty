import Game from './Game';
import HomePage from './Components/Homepage';
import WaitingRoom from './Components/WaitingRoom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomName" element={<WaitingRoom />} />
      </Routes>
    </Router>
  );
}
