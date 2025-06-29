import Footer from "./common/Footer";
import Navigation from "./common/Navigation";
import "../styles/homepage.css";

export default function Homepage() {
  return (
    <div className="homepage-container">
      <Navigation />
      <div className="main-content">Main</div>
      <Footer />
    </div>
  );
}
