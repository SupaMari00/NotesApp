import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import HomePage from "./pages/HomePage.jsx"
import CreateNotePage from "./pages/CreateNotePage.jsx"
import EditNotePage from "./pages/EditNotePage.jsx"
import ViewNotePage from "./pages/ViewNotePage.jsx"

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <div className="header-text">
            <h1>Notes</h1>
            <p>View, create, and edit notes.</p>
          </div>
          <button className="button secondary toggle-button" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-note" element={<CreateNotePage />} />
          <Route path="/notes/:id" element={<EditNotePage />} />
          <Route path="/notes/:id/view" element={<ViewNotePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
