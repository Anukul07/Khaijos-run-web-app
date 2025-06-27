import {
  FaFacebookF,
  FaSnapchatGhost,
  FaInstagram,
  FaTwitter,
  FaCopyright,
} from "react-icons/fa";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="left-section">
        <FaCopyright
          style={{
            marginRight: "0.5rem",
            fontSize: "1.3em",
            verticalAlign: "middle",
          }}
        />
        <p>Khaijos, 2025</p>
      </div>

      <div className="mid-section">
        <a href="#">Subscribe to Newsletter</a>
        <a href="#">Privacy / Policy</a>
        <a href="#">Help</a>
      </div>

      <div className="right-section">
        <p>Socials</p>
        <div className="social-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
            aria-label="facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://snapchat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
            aria-label="snapchat"
          >
            <FaSnapchatGhost />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
            aria-label="instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
            aria-label="twitter"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
