import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

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
import ContactUsPage from "./website/ContactUsPage";
import AccountType from "./website/steps/AccountType";
import StudentSignup from "./website/StudentSignup";
import LandlordSignup from "./website/LandlordSignup";
import AboutUsPage from "./website/AboutUsPage";
import ServicesPage from "./website/ServicesPage";
import PropertyPage from "./website/PropertyPage";
import LandlordAgent from "./website/LandlordAgent";
import SignUp from "./auth/SignUp";

import StudentDashboard from "./website/dashboards/StudentDashboard";
import PropertyOwnerDashboard from "./website/dashboards/PropertyOwnerDashboard";
import Login2 from "./auth/Login2";
import PropertyDetailPage from "./website/PropertyDetailPage";
import PropertyListings from "./website/PropertyListings";
import LookupValues from "./lists/LookupValues";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/properties" element={<PropertyPage />}>
          <Route path="" element={<PropertyListings />} />
          <Route path=":id" element={<PropertyDetailPage />} />
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/landlord-agent" element={<LandlordAgent />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/account-type" element={<AccountType />} />
        <Route path="/student" element={<StudentSignup />} />
        <Route path="/account-creation" element={<LandlordSignup />} />

        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/properties-dashboard" element={<PropertyOwnerDashboard />}>
          <Route path="" element={<Overview />} />
          <Route path="properties" element={<PropertyList />} />
          <Route path="properties/add-new" element={<PropertyForm />} />
          <Route path="reviews" element={<PropertyList />} />
        </Route>

        <Route path="/admin-dashboard" element={<Dashboard />}>
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
          <Route path="lookup-values" element={<LookupValues />} />
          <Route path="reviews" element={<LookupValues />} />
          <Route path="landlords/add-new" element={<LandlordForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
