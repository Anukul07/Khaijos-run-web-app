import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Authentication from "./components/authentication/Authentication";
import Homepage from "./components/Homepage";
import "leaflet/dist/leaflet.css";
import Trainer from "./components/Trainer";
import Profile from "./components/Profile";
import Sessions from "./components/Sessions";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import PurchaseHistory from "./components/PurchaseHistory";
import Stats from "./components/Stats";
import KhaltiOverlay from "./components/KhaltiOverlay";

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
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchases" element={<PurchaseHistory />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/khalti" element={<KhaltiOverlay />} />
      </Routes>
    </Router>
  );
}

export default App;
