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
import StudentList from "./lists/StudentList";
import Overview from "./core/Overview";

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
          <Route path="" element={<Overview />} />
          <Route path="properties/add-new" element={<PropertyForm />} />
          <Route path="institutions/add-new" element={<UniversityForm />} />
          <Route path="employee-form" element={<EmployeeForm />} />
          <Route path="properties" element={<PropertyList />} />
          <Route path="institutions" element={<UniversityList />} />
          <Route path="employee-list" element={<EmployeeList />} />
          <Route path="students" element={<StudentList />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
