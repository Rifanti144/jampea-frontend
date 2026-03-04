import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Destinations from "../pages/Destinations";
import DestinationDetail from "../pages/DestinationDetail";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destinations/:id" element={<DestinationDetail />} />
    </Routes>
  );
}

export default AppRouter;
