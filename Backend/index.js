const express = require("express")
const cors = require("cors")
const db = require("better-sqlite3")("notes.db")
db.pragma("journal_mode = WAL")

// Database setup
const createTables = db.transaction(() => {
    db.prepare(
        `
        CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at INTEGER NOT NULL
        )
        `
    ).run()
})

createTables()
// Database setup end

const app = express()
app.use(express.json())
app.use(cors())



app.get("/notes", (req, res) => {
    try {
        const rows = db.prepare("SELECT * FROM notes").all()
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/notes/:id", (req, res) => {
    try {
        const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(req.params.id)
        if (!note) {
            return res.status(404).json({ error: "Note not found" })
        }
        res.json(note)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})



app.post("/notes", (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        return res.status(400).json({ error: "All fields required" })
    }

    try {
        const stmt = db.prepare("INSERT INTO notes (title, content, created_at) VALUES (?, ?, ?)")
        const result = stmt.run(title, content, Date.now())
        res.status(201).json({
            id: result.lastInsertRowid,
            title,
            content
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


//EDIT NOTES ROUTE
app.put("/notes/:id", (req, res) => {
    const { id } = req.params
    const { title, content } = req.body

    try {
        const stmt = db.prepare("UPDATE notes SET title = ?, content = ? WHERE id = ?")
        const result = stmt.run(title, content, id)
        if (result.changes === 0) {
            return res.status(404).json({ error: "Note not found" })
        }
        res.json({ message: "Note updated" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//DELETE NOTES ROUTE
app.delete("/notes/:id", (req, res) => {
    const { id } = req.params

    try {
        const stmt = db.prepare("DELETE FROM notes WHERE id = ?")
        const result = stmt.run(id)
        if (result.changes === 0) {
            return res.status(404).json({ error: "Note not found" })
        }
        res.json({ message: "Note deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(3000, () => {
    console.log("server started at port 3000")
})