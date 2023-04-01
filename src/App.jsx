import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./Layout";
import TrackingPage from "./pages/TrackingPage";
import "./style/main.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
