import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Footer from "./common/Footer";
import Navigation from "./common/Navigation";
import ConfirmationModal from "./common/ConfirmationModal";
import "../styles/profile.css";
import profilePlaceHolder from "../assets/Navigation/profile.jpg";
import { FaCheckCircle } from "react-icons/fa";

export default function Profile() {
  const [modalMode, setModalMode] = useState("profile");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [icon, setIcon] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [contact, setContact] = useState(user.phone || "");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user.photo ? `/profiles/${user.photo}` : profilePlaceHolder
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const originalPhone = user.phone;
  const originalPhoto = user.photo;

  const fileInputRef = useRef();
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/deliveryAddress/get",
          {
            userId: user._id,
          }
        );

        if (res.status === 200) {
          const data = res.data;
          setAddress1(data.addressLine1 || "");
          setAddress2(data.addressLine2 || "");
          setCity(data.city || "Kathmandu");
        }
      } catch (error) {
        console.warn("No delivery address found or failed to fetch.");
      }
    };

    if (user._id) {
      fetchAddress();
    }
  }, []);
  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess(false);
        setIcon(null);
        setSuccessMessage("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [success]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleUpdate = () => {
    if (!contact.trim() || !address1.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setModalMode("profile");
    setShowModal(true);
  };

  const handleConfirmUpdate = async () => {
    const userId = user._id;
    try {
      // --- Step 1: Update profile (phone + image) ---
      const profileChanged = contact !== originalPhone || selectedFile !== null;

      if (profileChanged) {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("phone", contact);
        if (selectedFile) {
          formData.append("photo", selectedFile);
        }
        const response = await axios.post(
          "http://localhost:5000/api/profile/update",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const updatedData = response.data.user;

        const updatedUser = {
          ...user,
          phone: updatedData.phone,
          photo: updatedData.photo,
        };

        // Save updated user to localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      // --- Step 2: Update delivery address ---
      const addressChanged = address1 || address2;

      if (addressChanged) {
        const res = await axios.post(
          "http://localhost:5000/api/deliveryAddress/setup/",
          {
            userId: user._id,
            addressLine1: address1,
            addressLine2: address2,
            city,
            province: "Bagmati",
          }
        );
        const newAddress = res.data.deliveryAddress;
        setAddress1(newAddress.addressLine1);
        setAddress2(newAddress.addressLine2);
        setCity(newAddress.city);
      }

      setShowModal(false);
      setSuccess(true);
      setSuccessMessage("Profile has been updated successfully");
      setIcon(<FaCheckCircle color="lightgreen" size={24} />);
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("**********");
  const [newPassword, setNewPassword] = useState("");
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const handleConfirmPasswordChange = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/profile/change-password",
        {
          userId: user._id,
          oldPassword: password,
          newPassword: newPassword,
        }
      );

      if (res.status === 200) {
        setSuccessMessage("Password has been successfully updated");
        setIcon(<FaCheckCircle color="lightgreen" size={24} />);
        setSuccess(true);
        setShowModal(false);
        setChangePasswordMode(false);
        setPassword("");
        setNewPassword("");

        setTimeout(() => {
          setShowModal(false);
          setSuccess(false);
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage(
        "Your old password does not match. Please try again later."
      );
      setIcon(null);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <div className="profile-component">
      <Navigation />
      <div className="profile-container">
        <div className="profile-box">
          <div className="profile-selection-box">
            <button
              className={`profile-tab-button ${
                activeTab === "profile" ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`profile-tab-button ${
                activeTab === "privacy" ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab("privacy")}
            >
              Privacy
            </button>
          </div>
          <div className="profile-update-box">
            {activeTab === "profile" && (
              <div className="profile-selected">
                <div className="profile-picture-wrapper">
                  <label className="profile-image-label">
                    <img
                      src={profileImage}
                      alt="profile"
                      className="profile-image"
                    />
                    <div className="image-overlay">Update</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                      ref={fileInputRef}
                    />
                  </label>
                </div>

                <div className="profile-input-group">
                  <label>Name</label>
                  <input type="text" value={user?.name || ""} readOnly />
                </div>

                <div className="profile-input-group">
                  <label>Contact No</label>
                  <input
                    type="text"
                    className={`profile-input ${
                      error && !contact.trim() ? "profile-input-error" : ""
                    }`}
                    placeholder="Please enter your contact number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>

                <div className="profile-input-group">
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    className={`profile-input ${
                      error && !address1.trim() ? "profile-input-error" : ""
                    }`}
                    placeholder="Please enter your address"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>

                <div className="profile-input-group">
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    placeholder="(Optional)"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>

                <div className="profile-input-row">
                  <select
                    className="profile-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Bhaktapur">Bhaktapur</option>
                    <option value="Lalitpur">Lalitpur</option>
                  </select>

                  <input
                    type="text"
                    className="profile-input"
                    value="Bagmati"
                    readOnly
                  />
                </div>

                {error && (
                  <div className="profile-error-msg">
                    Please fill in the mandatory fields.
                  </div>
                )}

                <button
                  className="profile-update-button"
                  onClick={handleUpdate}
                >
                  <span>Update</span>
                </button>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="privacy-selected">
                <div className="profile-input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="profile-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                  />
                </div>

                <div
                  className="profile-input-group"
                  style={{ position: "relative" }}
                >
                  <label>
                    {changePasswordMode ? "Current Password" : "Password"}
                  </label>
                  <input
                    type="password"
                    className="profile-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!changePasswordMode && (
                    <span
                      className="change-password-toggle"
                      onClick={() => setChangePasswordMode(true)}
                    >
                      Change Password
                    </span>
                  )}
                </div>

                {changePasswordMode && (
                  <>
                    <div className="profile-input-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        className="profile-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <button
                      className="profile-update-button"
                      onClick={() => {
                        if (!password.trim() || !newPassword.trim()) {
                          setError(true);
                          return;
                        }
                        setError(false);
                        setModalMode("password");
                        setShowModal(true);
                      }}
                    >
                      <span>Update</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ConfirmationModal
        show={showModal || success}
        message={
          modalMode === "password"
            ? "Are you sure you want to update your password?"
            : "Are you sure you want to update?"
        }
        onConfirm={
          modalMode === "password"
            ? handleConfirmPasswordChange
            : handleConfirmUpdate
        }
        onCancel={() => {
          setShowModal(false);
          setError(false);
        }}
        success={success}
        successMessage={successMessage}
        icon={icon}
      />
    </div>
  );
}
