import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserDashboard from "../pages/UserDashboard/UserDashboard";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import SubmitComplaint from "../pages/SubmitComplaint/SubmitComplaint";
import MyComplaints from "../pages/MyComplaints/MyComplaints";
import ComplaintDetails from "../pages/ComplaintDetails/ComplaintDetails";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ManageComplaints from "../pages/ManageComplaints/ManageComplaints";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/submit-complaint"element={<SubmitComplaint />}/>
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-complaints" element={<ManageComplaints />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;