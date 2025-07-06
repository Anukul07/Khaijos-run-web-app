import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Authentication from "./components/authentication/Authentication";
import Homepage from "./components/Homepage";
import "leaflet/dist/leaflet.css";
import Trainer from "./components/Trainer";
import Profile from "./components/Profile";
import Sessions from "./components/Sessions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sessions" element={<Sessions />} />
      </Routes>
    </Router>
  );
}

export default App;
