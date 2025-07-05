import Footer from "./common/Footer";
import Navigation from "./common/Navigation";
import "../styles/trainer.css";

export default function Trainer() {
  return (
    <div className="trainer-container">
      <Navigation />
      <div className="trainer-box">
        <div className="trainer-form">trainer-form</div>
        <div className="trainers-fetched">trainer-fetchd</div>
      </div>
      <Footer />
    </div>
  );
}
