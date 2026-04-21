# Notes App

A full-stack notes application built with React and Express.js.

## Features

- Create, read, update, and delete notes
- Grid-based note layout
- Dark mode toggle
- View notes in a dedicated view page
- Responsive design

## Project Structure

```
Notes App/
├── Backend/
│   ├── index.js
│   └── package.json
├── Frontend/
│   └── notesapp/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   ├── index.css
│       │   ├── api.js
│       │   └── pages/
│       │       ├── HomePage.jsx
│       │       ├── CreateNotePage.jsx
│       │       ├── EditNotePage.jsx
│       │       └── ViewNotePage.jsx
│       └── package.json
└── .gitignore
```

## Installation

### Prerequisites
- Node.js and npm

### Setup

1. **Backend Setup**
```powershell
cd Backend
npm install
npm start
```
The backend server will run on `http://localhost:3000`

2. **Frontend Setup**
```powershell
cd Frontend/notesapp
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

## Technologies

- **Frontend**: React, React Router, Vite, react-icons
- **Backend**: Express.js, CORS, better-sqlite3
- **Database**: SQLite

## License

ISC
