import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Akhada from "./pages/Akhada";
import Subscription from "./pages/Subscription";
import Login from "./pages/Login";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("mn_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/akhada" element={<Akhada />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
