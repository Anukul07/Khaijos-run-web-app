import { useState, useEffect } from "react";
import Footer from "./common/Footer";
import Navigation from "./common/Navigation";
import "../styles/trainer.css";
import profilePlaceHolder from "./../assets/Navigation/profile.jpg";
import t1 from "../assets/Trainers/t1.jpg";
import t2 from "../assets/Trainers/t2.jpg";
import t3 from "../assets/Trainers/t3.jpg";
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";
import ConfirmationModal from "./common/ConfirmationModal";
import axios from "axios";

export default function Trainer() {
  const testimonials = [
    {
      name: "Suman Karki",
      img: t1,
      quote:
        "Becoming a trainer at Khaijos helped me transform my passion into purpose. Watching others grow with me is the best reward.",
    },
    {
      name: "Nischal Thapa",
      img: t2,
      quote:
        "The community at Khaijos is inspiring. Training here means shaping lives and building discipline through running.",
    },
    {
      name: "Bikash Gurung",
      img: t3,
      quote:
        "Running is therapy. Khaijos gave me the platform to guide, inspire, and build mental strength through every kilometer.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const [allTrainers, setAllTrainers] = useState([]);
  const [profileImage, setProfileImage] = useState(profilePlaceHolder);

  const [formData, setFormData] = useState({
    totalAccolades: "",
    personalBest: "",
    motivation: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const userName = user?.name || "Name";

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/trainers/all"
        );
        setAllTrainers(response.data);
      } catch (error) {
        console.error("Failed to fetch trainers:", error);
      }
    };
    fetchTrainers();
  }, []);
  useEffect(() => {
    const updatedUser = JSON.parse(localStorage.getItem("user"));
    if (updatedUser && updatedUser.photo) {
      setProfileImage(`/profiles/${updatedUser.photo}`);
    } else {
      setProfileImage(profilePlaceHolder);
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const nextTestimonial = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const handleRequestMeeting = () => {
    const { totalAccolades, personalBest, motivation } = formData;
    if (!totalAccolades || !personalBest || !motivation) {
      setValidationMsg("Please fill in all fields before submitting.");
      return;
    }
    setValidationMsg("");
    setShowModal(true);
    setSuccess(false);
  };

  const handleConfirm = async () => {
    try {
      const payload = {
        userId,
        ...formData,
      };

      await axios.post("http://localhost:5000/api/trainers/setup", payload);

      setSuccess(true);
      setFormData({
        totalAccolades: "",
        personalBest: "",
        motivation: "",
      });
      setTimeout(() => {
        setShowModal(false);
      }, 2500);
    } catch (err) {
      console.error("Failed to submit trainer setup:", err.message);
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="trainer-container">
      <Navigation />
      <div className="trainer-box">
        <div className="trainer-form">
          <div className="trainer-form-header">
            <h2>Become a Trainer</h2>
          </div>
          <div className="trainer-form-top">
            <p>{userName}</p>
            <img
              src={profileImage}
              alt="profile-img"
              className="trainer-profile-img"
            />
          </div>
          <div className="trainer-form-mid">
            <div className="form-group">
              <label htmlFor="totalAccolades">Total Accolades</label>
              <input
                type="text"
                id="totalAccolades"
                placeholder="Enter number"
                value={formData.totalAccolades}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="personalBest">Personal Best</label>
              <input
                type="text"
                id="personalBest"
                placeholder="e.g. 5km in 22m"
                value={formData.personalBest}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="motivation">Motivation</label>
              <textarea
                id="motivation"
                placeholder="Describe what motivates you to be a trainer at Khaijos"
                value={formData.motivation}
                onChange={handleInputChange}
              />
            </div>

            {validationMsg && (
              <p className="validation-message">{validationMsg}</p>
            )}

            <button
              className="trainer-submit-button"
              onClick={handleRequestMeeting}
            >
              <span>Request a Meeting</span>
            </button>
          </div>
          <div className="trainer-form-btm">
            <div className="carousel-wrapper">
              <button className="carousel-arrow" onClick={prevTestimonial}>
                <FaChevronLeft />
              </button>

              <div className="testimonial-card">
                <img
                  src={testimonials[current].img}
                  alt={testimonials[current].name}
                  className="testimonial-img"
                />
                <div className="testimonial-content">
                  <p className="quote">"{testimonials[current].quote}"</p>
                  <p className="author">- {testimonials[current].name}</p>
                </div>
              </div>

              <button className="carousel-arrow" onClick={nextTestimonial}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="trainers-fetched">
          <h2>Our Trainers</h2>
          {allTrainers.map((trainer) => (
            <div key={trainer._id} className="trainer-card">
              <div className="trainer-card-left">
                <p>
                  <strong>{trainer.userId.name}</strong>
                </p>
                <p>
                  <strong>Email:</strong> {trainer.userId.email}
                </p>
                <p>
                  <strong>Total Accolades:</strong> {trainer.totalAccolades}
                </p>
                <p>
                  <strong>Personal Best:</strong> {trainer.personalBest}
                </p>
                <p>
                  <strong>Total Sessions:</strong>{" "}
                  {trainer.statsId?.totalSessionsCompleted || 0}
                </p>
              </div>
              <div className="trainer-card-right">
                <img
                  src={
                    trainer.userId.photo
                      ? `/profiles/${trainer.userId.photo}`
                      : profilePlaceHolder
                  }
                  alt={trainer.userId.name}
                  className="trainer-card-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Are you sure you want to apply to become a Trainer at Khaijos?"
        success={success}
        successMessage="Thanks for applying, you will be contacted soon."
        icon={<FaCheckCircle color="lightgreen" size={24} />}
      />
    </div>
  );
}
