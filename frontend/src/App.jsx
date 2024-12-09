import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Login2 from "./auth/Login2";
import SignUp from "./auth/SignUp";
import Dashboard from "./core/Dashboard";
import PropertyForm from "./forms/PropertyForm";
import PropertyList from "./lists/PropertyList";
import EmployeeList from "./lists/EmployeeList";
import UniversityList from "./lists/UniversityList ";
import UniversityForm from "./forms/UniversityForm";
import EmployeeForm from "./forms/EmployeeForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/property-owner-login" element={<Login2 />} />
        <Route path="/property-owner-signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested route */}
          <Route path="property-form" element={<PropertyForm />} />
          <Route path="university-form" element={<UniversityForm />} />
          <Route path="employee-form" element={<EmployeeForm />} />
          <Route path="property-list" element={<PropertyList />} />
          <Route path="university-list" element={<UniversityList />} />
          <Route path="employee-list" element={<EmployeeList />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
