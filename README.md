🎉 Event Management App


A simple and interactive platform to create, view, register, and manage local events. Open your browser and navigate to: 👉 http://localhost:3000

📌 Project Overview

The Event Management App is a full-stack web application that enables users to:

✅ Create new events with details like date, time, location, and banner.

✅ View a list of all upcoming events.

✅ Edit or delete existing events.

✅ Register for events by providing name and email.

✅ View attendees for each event.

Built using React, Node.js, and Express, this project is perfect for small organizations or communities to promote and manage events easily.

🚀 Getting Started

1. Install Dependencies
npm install

2. Start the Development Server
npm start

⚠️ Ensure the backend server (Node/Express) is also running on http://localhost:5000.

   node server.js


📁 Features

🔍 Browse Events: View all events on the homepage.

➕ Create Event: Fill out a form to create a new event.

✏️ Edit Event: Update event details via the edit form.

🗑️ Delete Event: Remove events with a single click.

🧑‍🤝‍🧑 Register: Register attendees with name & email.

📋 View Attendees: See a list of all registered participants.

🛠 Tech Stack

Frontend: React, React Router, Axios

Backend: Node.js, Express.js

Styling: CSS, Inline styles

Data: JSON / MongoDB (depending on backend setup)

📜 Available Scripts
Command	Description
npm start	Starts the React app in development mode
npm test	Launches the test runner
npm run build	Creates a production


📁 Folder Structure


LOCAL-EVENTS-APP/

├── eventhub-frontend/ # Frontend React application

│   ├── public/ # Static files

│   │   └── assets/ # Additional assets (not shown in your file list)

│   ├── src/ # Source files

│   │   ├── components/ # Reusable UI components (not shown in your file list)

│   │   ├── App.js # Main application component

│   │   ├── index.js # Entry point (assuming index.jsx is index.js)

│   │   └── ...other src files...

│   └── package.json # Frontend dependencies

├── eventhub-frontend-backup/ # Backup of frontend application

├── node_modules/ # Installed dependencies

├── dummy.json # JSON data file

├── package-lock.json # Lockfile for dependencies

├── package.json # Top-level dependencies (if any)

├── server.js # Backend server (if this is the entry point)

└── README.md # Project documentation


LOCAL-EVENTS-APP/
├── eventhub-frontend/

│   ├── App.js

│   ├── App.test.js

│   ├── CreatePage.js

│   ├── dummy.json

│   ├── EditEvent.js

│   ├── EventDetail.js

│   ├── EventList.js

│   ├── HomePage.js

│   ├── index.css

│   ├── index.js

│   ├── logo.svg

│   ├── package-lock.json

│   ├── package.json

│   ├── reportWebVitals.js

│   ├── server.js (or not, depending on your setup)

│   └── setupTests.js

├── eventhub-frontend-backup/

├── node_modules/

├── dummy.json

├── package-lock.json

├── package.json

└── server.js (if not inside eventhub-frontend)


📜 Scripts
Command	Purpose
npm start	Runs app in development mode
npm test	Runs test suite
npm run build	Builds app for production
npm run eject	Ejects from Create React App (optional)
📦 Tech Stack

React (Frontend)

Axios (API Calls)

React Router (Routing)

Node.js + Express (Backend)

JSON or MongoDB (Database)

