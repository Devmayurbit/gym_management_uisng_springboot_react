import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Goals from "./pages/Goals";
import Services from "./pages/Services";
import Schedule from "./pages/Schedule";
import FAQ from "./pages/FAQ";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/services" element={<Services />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </>
  );
}
