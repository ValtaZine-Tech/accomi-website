import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './auth/Login';
import Login2 from './auth/Login2';
import SignUp from './auth/signup';
import Dashboard from './core/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/property-owner-login" element={<Login2 />} />
        <Route path="/property-owner-signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
