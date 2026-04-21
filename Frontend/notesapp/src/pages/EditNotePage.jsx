import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../api"

export default function EditNotePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`)
        setTitle(response.data.title)
        setContent(response.data.content)
      } catch (err) {
        setError(err.response?.data?.error || err.message)
      } finally {
        setLoading(false)
      }
    }

    loadNote()
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    try {
      setSaving(true)
      await api.put(`/notes/${id}`, { title: title.trim(), content: content.trim() })
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p>Loading note…</p>
  }

  return (
    <main className="app-page">
      <header className="page-header">
        <h1>Edit note</h1>
      </header>

      <form className="note-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a title"
          />
        </label>

        <label>
          Content
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your note here"
            rows={6}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button type="button" className="button secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="button" disabled={saving}>
            {saving ? "Saving..." : "Update note"}
          </button>
        </div>
      </form>
    </main>
  )
}
