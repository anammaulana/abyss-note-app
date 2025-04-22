const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;  // Sesuaikan port sesuai keinginan

app.use(cors());
app.use(express.json()); // Untuk handle JSON requests

// Routes
const notesRouter = require('./routes/noteRoute'); // Import routes
app.use('/api/notes', notesRouter); // API route untuk notes

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
