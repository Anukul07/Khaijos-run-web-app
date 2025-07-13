🏃‍♂️ Khaijos Run Web Application
Khaijos is a modern MERN-stack application tailored for running enthusiasts and trainers. This platform bridges the gap between individuals passionate about running and trainers eager to host structured running sessions. Whether you're looking to join a morning jog or lead a fitness group, Khaijos makes it seamless and interactive.

📝 Description & Purpose
Khaijos Run is designed to foster a connected community of runners. The application enables:
  * 🏃‍♀️ Runners to join local running sessions
  * 🧑‍🏫 Trainers to create and host structured group runs
  * 📍 Map-based session routes with dynamic distance calculation
  * 🛒 Shopping module to purchase running essentials

The primary goal is to build motivation, foster discipline, and create an inclusive space for physical well-being.

🎨 UI/UX Design Philosophy
The application embraces consistency, clarity, and accessibility:
   * ✅ Dark theme with high contrast: White font on black backgrounds for readability
   * 🟦 Texture of blues for highlights and menu contrasts
   * 🎯 Accessible components: Proper button states, readable font sizes, interactive modals
   * 🧩 Consistent design tokens: Buttons, forms, overlays, and modals follow unified spacing and font rules
   * 🧵 Modal overlays and dynamic animations for interactions (e.g., joining sessions, payment confirmations)

🧑‍💻 Tech Stack
  * Frontend: React, Context API, Leaflet.js, Axios, CSS3
  * Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
  * APIs: Mapbox, OpenCage, Nodemailer
  * Other: Multer (for uploads), Polyline (route decoding)

  
🛠️ Setup Instructions
  
  1. Clone repo
     cd khaijos-run-app
  
  2. Backend Setup
    cd backend
    npm install
    Create a .env file inside /backend and configure:
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    EMAIL_USER=your_email_address (e.g., khaijos.run.app@gmail.com)
    EMAIL_PASS=your_app_specific_password
  
  4. Frontend Setup
    cd ../frontend
    npm install
    Create a .env file inside /frontend if needed (optional).

🌍 External API Configuration
  To enable geolocation and mapping features, register and configure the following:
  📌 Mapbox API
  In frontend/src/utils/getRoutePath2.js, replace:
  const MAPBOX_TOKEN = "your_mapbox_access_token_here";

  📌 OpenCage API
  In frontend/src/utils/reverseGeocode.js, replace:
  const OPENCAGE_API_KEY = "your_opencage_api_key_here";
  Get your OpenCage key from OpenCage Geocoder.

📸 UI Screenshots
    <img width="1919" height="929" alt="Screenshot 2025-07-13 190513" src="https://github.com/user-attachments/assets/31097aef-3eee-4455-a0ae-e4fe2c70a028" />
    <img width="1909" height="938" alt="Screenshot 2025-07-13 190447" src="https://github.com/user-attachments/assets/46cdc823-4089-4131-a945-b5a6d8b24b62" />
    <img width="1913" height="942" alt="Screenshot 2025-07-13 190329" src="https://github.com/user-attachments/assets/43c8973f-d061-4807-8d1e-2e4189dbfabc" />
    <img width="1914" height="935" alt="Screenshot 2025-07-13 190311" src="https://github.com/user-attachments/assets/d8095e52-ff45-4948-ac19-9bfa6929d9b1" />
    <img width="1919" height="937" alt="Screenshot 2025-07-13 190249" src="https://github.com/user-attachments/assets/eb646ec1-cc32-47e0-80b3-be4a5e4898ba" />
    <img width="1912" height="944" alt="Screenshot 2025-07-13 190201" src="https://github.com/user-attachments/assets/b4b70e55-3fd4-4dd4-9585-1dfa18d4319e" />
    <img width="1898" height="852" alt="Screenshot 2025-07-13 190138" src="https://github.com/user-attachments/assets/5057ba37-d024-4f86-9438-93e29f6560da" />
    <img width="1912" height="930" alt="Screenshot 2025-07-13 190020" src="https://github.com/user-attachments/assets/a359647f-ca23-4542-be19-7e9cb98fbf75" />
    <img width="1919" height="936" alt="Screenshot 2025-07-13 185936" src="https://github.com/user-attachments/assets/644c81ae-af02-47b0-a132-4e4804073569" />
    <img width="1919" height="935" alt="Screenshot 2025-07-13 185154" src="https://github.com/user-attachments/assets/aae37431-6e54-40de-8cfb-ea031d244442" />
    <img width="1910" height="937" alt="Screenshot 2025-07-13 185132" src="https://github.com/user-attachments/assets/7e4f7afe-8aef-4be6-ac5c-904927392012" />

🚫 Limitations
❌ No Admin Panel yet (Admin dashboard may be added in a future update)


📦 Product management is currently static — can be extended via admin CRUD


📤 Email OTPs are limited to the configured app email sender (via Nodemailer)



🚀 Future Enhancements
   * Admin dashboard for managing users, products, and sessions
   * Realtime notifications with WebSockets
   * Trainer leaderboard and analytics
   * Progressive Web App (PWA) support

💡 Inspiration
  The motivation behind Khaijos is simple: “Movement that inspires you to keep moving.”
  This project reflects passion for running, wellness, and full-stack development.

👤 Author
Developed with ❤️ by Anukul Nepal
 📧 Connect on LinkedIn - www.linkedin.com/in/Anukul07Nepal


