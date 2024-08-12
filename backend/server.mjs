import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
  origin: 'http://localhost:5000', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));


app.use(express.static(join(__dirname, '../frontend/dist')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql@11614',
  database: 'takeufarward',
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) {
      console.error('Error fetching flashcards:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, result) => {
    if (err) {
      console.error('Error inserting flashcard:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ idflashcards: result.insertId, question, answer });
  });
});


app.put('/api/flashcards/:idflashcards', (req, res) => {
  const { idflashcards } = req.params;
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE idflashcards = ?', [question, answer, idflashcards], (err) => {
    if (err) {
      console.error('Error updating flashcard:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.sendStatus(200);
  });
});

app.delete('/api/flashcards/:idflashcards', (req, res) => {
  const { idflashcards } = req.params;
  db.query('DELETE FROM flashcards WHERE idflashcards = ?', [idflashcards], (err) => {
    if (err) {
      console.error('Error deleting flashcard:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.sendStatus(200);
  });
});

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/dist', 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
