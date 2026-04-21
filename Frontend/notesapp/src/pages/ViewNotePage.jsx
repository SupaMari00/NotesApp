import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../api"

export default function ViewNotePage() {
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`)
        setNote(response.data)
      } catch (err) {
        setError(err.response?.data?.error || err.message)
      } finally {
        setLoading(false)
      }
    }

    loadNote()
  }, [id])

  if (loading) {
    return <p>Loading note…</p>
  }

  if (error) {
    return <p className="error">{error}</p>
  }

  return (
    <main className="app-page">
      <header className="page-header">
        <h1>{note.title}</h1>
        <div className="nav-links">
          <Link className="button secondary" to="/">
            Back to Notes
          </Link>
          <Link className="button  small" to={`/notes/${id}`}>
            Edit Note
          </Link>
        </div>
      </header>

      <div className="note-content">
        <p>{note.content}</p>
      </div>
    </main>
  )
}