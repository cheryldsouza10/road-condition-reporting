# 🛠️ Defect Reporter Web App

A full-stack application for reporting infrastructure defects via an interactive map interface. Users can click on a map, select from predefined defect types, and submit reports. A dashboard shows real-time metrics with a pie chart. Admins can bulk upload JSON files of defects as well.

---


---

## 🚀 Features

- 📍 Interactive map with click-to-report functionality (Leaflet + OpenStreetMap)
- 📝 File a defect by selecting location and defect type
- 📊 Real-time dashboard with total defects & pie chart by type
- 📂 Upload API to batch import defect reports via JSON file
- ✅ CI/CD setup using GitHub Actions for both frontend & backend

---

## 🧰 Tech Stack

| Layer      | Stack                                 |
|------------|----------------------------------------|
| Frontend   | React, Vite, Leaflet, Recharts, CSS    |
| Backend    | Node.js, Express.js, MongoDB, Multer   |
| Database   | MongoDB (local or Atlas)               |
| DevOps     | GitHub Actions (CI/CD)                 |

---

## ⚙️ Installation & Setup

### 🔧 Prerequisites

- Node.js 18+
- MongoDB installed locally or an Atlas cluster
- Git

---

### 📦 Backend Setup
### 1. Navigate to the backend directory and install dependancies:
cd backend
npm install

### 2. Create .env file in the backend:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_uri
JWT_SECRET=your_jwt_secret_key

### 3. Run the backend server:
npm run dev

API will be available at: http://localhost:5000/api

## 💻 Frontend Setup
### 1. Navigate to the frontend directory and install dependancies:
cd ../frontend
npm install

### 2. Create .env file in frontend/:
REACT_APP_API_URL=http://localhost:5000/api

### 3. Start the React App:
npm start

Opens at http://localhost:3000

## 🛠️ Deployment
Backend (Render)
Frontend (Vercel)

## ✅ Features
🗺️ Interactive map UI (Leaflet + OpenStreetMap) to select exact defect locations

📝 Submit defects with predefined types (e.g., pothole, crack, water leak)

💡 Dynamic modal form opens on map click for quick defect filing

📊 Real-time metrics (total count and pie chart by defect type)

🗃️ MongoDB storage for all defects with location, type, and timestamp

📥 Bulk defect upload API supports .json files (ignores extra fields)

📈 Live metrics refresh immediately after submitting a new defect

🔄 Component-based React UI with code-splitting and lazy loading

🎨 Minimal, responsive layout with centralized map and fixed dashboard

🔧 Backend REST APIs built with Express and Mongoose

🛡️ CI/CD pipeline for build, test, and deploy (via GitHub Actions)

## Sample JSON File for Upload:
[
  {
    "timestamp": "2025-06-23T14:22:00Z",
    "coordinates": [12.9716, 77.5946],
    "defect_type": "Pothole"
  },
  {
    "timestamp": "2025-06-23T15:00:00Z",
    "coordinates": [13.002, 77.65],
    "defect_type": "Crack"
  }
]
