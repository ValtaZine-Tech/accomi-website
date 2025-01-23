import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Login2 from "./auth/Login2";
import Dashboard from "./core/Dashboard";
import PropertyForm from "./forms/PropertyForm";
import PropertyList from "./lists/PropertyList";
import EmployeeList from "./lists/EmployeeList";
import UniversityList from "./lists/UniversityList";
import UniversityForm from "./forms/UniversityForm";
import EmployeeForm from "./forms/EmployeeForm";
import StudentList from "./lists/StudentList";
import Overview from "./core/Overview";
import LandlordList from "./lists/LandlordList";
import LandlordForm from "./forms/LandlordForm";
import LandingPage from "./website/LandingPage";
import BookingPage from "./website/StudentSignup";
import ContactUsPage from "./website/ContactUsPage";
import AccountType from "./website/steps/AccountType";
import StudentSignup from "./website/StudentSignup";
import LandlordSignup from "./website/LandlordSignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/services" element={<LandingPage />} />
        <Route path="/properties" element={<LandingPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/account-type" element={<AccountType />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/agent-signup" element={<BookingPage />} />
        <Route path="/landlord-signup" element={<LandlordSignup />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/property-owner-login" element={<Login2 />} />
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
          <Route path="landlords" element={<LandlordList />} />
          <Route path="landlords/add-new" element={<LandlordForm />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
