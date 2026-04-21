import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../api"

export default function CreateNotePage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required!")
      return
    }

    try {
      setSaving(true)
      await api.post("/notes", { title: title.trim(), content: content.trim() })
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="app-page">
      <header className="page-header">
        <h1>Create note</h1>
      </header>

      {error && <p className="error">{error}</p>}

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


        <div className="form-actions">
          <button type="button" className="button secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="button" disabled={saving}>
            {saving ? "Saving..." : "Save note"}
          </button>
        </div>
      </form>
    </main>
  )
}
