import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"
import { api } from "../api"

export default function HomePage() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState(null)

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await api.get("/notes")
        setNotes(response.data)
      } catch (err) {
        setError(err.response?.data?.error || err.message)
      } finally {
        setLoading(false)
      }
    }

    loadNotes()
  }, [])

  const handleDelete = (id) => {
    setNoteToDelete(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    try {
      await api.delete(`/notes/${noteToDelete}`)
      setNotes((current) => current.filter((note) => note.id !== noteToDelete))
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setShowDeleteConfirm(false)
      setNoteToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setNoteToDelete(null)
  }

  return (
    <main className="app-page">
      <header className="page-header">
        <h1>My Notes</h1>
        <Link className="button create-button" to="/create-note">
          <FaPlus />
        </Link>
      </header>

      {loading && <p>Loading notes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && notes.length === 0 && <p className="no-notes">No notes yet.</p>}

      <div className="note-list">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <Link className="note-card-content" to={`/notes/${note.id}/view`}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </Link>
            <div className="note-card-actions">
              <Link className="button small" to={`/notes/${note.id}`}>
                Edit Note
              </Link>
              <button className="button small danger" onClick={() => handleDelete(note.id)}>
                Delete Note
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm">
            <p>Delete this note?</p>
            <button className="button danger" onClick={confirmDelete}>Yes</button>
            <button className="button secondary" onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </main>
  )
}
