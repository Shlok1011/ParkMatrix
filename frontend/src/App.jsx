import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import VehicleForm from "./pages/VehicleForm";
import ScanPage from "./pages/ScanPage";
import ParkingDashboard from "./pages/ParkingDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<VehicleForm />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/parking-status" element={<ParkingDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
