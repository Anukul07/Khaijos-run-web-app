import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Authentication from "./components/authentication/Authentication";
import Homepage from "./components/Homepage";
import "leaflet/dist/leaflet.css";
import Trainer from "./components/Trainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/trainer" element={<Trainer />} />
      </Routes>
    </Router>
  );
}

export default App;
