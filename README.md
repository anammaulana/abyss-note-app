# abyss-note-app

Wuih mantap banget stack-nya bro, solid dan populer! 🔥  
Berarti kita gas pake:

- ⚛️ **React** – buat frontend interaktif  
- 🛠️ **Node.js + Express** – buat API backend  
- 🐬 **MySQL** – buat simpan catatan belajarnya  

---

### ✍️ Struktur Fitur Aplikasi Pencatatan Belajar

Berikut gambaran fitur yang bisa kita mulai:

#### ✅ **Fitur Minimum (MVP):**
1. **Login / Register (optional kalau mau private)**
2. **Tambah Catatan Belajar**
3. **Lihat Semua Catatan (List View)**
4. **Detail Catatan**
5. **Edit / Hapus Catatan**
6. **Tagging & Filter berdasarkan topik**
7. **Search by Judul / Isi**

---

### 🗂️ Struktur Folder Awal (Monorepo Style)

```
/learn-log-app
│
├── /client (React)
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/     ← panggil API dari backend
│       └── App.jsx
│
├── /server (Node.js + Express)
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── models/       ← Sequelize (optional)
│       ├── config/       ← koneksi DB
│       └── server.js
│
└── README.md
```

---

### 🚀 Langkah Selanjutnya

1. **Setup backend Express + koneksi MySQL**
2. **Bikin model “Notes”** (id, title, content, tags, date)
3. **API endpoints:**
   - `GET /notes` – ambil semua
   - `POST /notes` – tambah baru
   - `GET /notes/:id` – detail
   - `PUT /notes/:id` – edit
   - `DELETE /notes/:id` – hapus

4. **Frontend React:**
   - Form input
   - List catatan
   - Detail & Edit view

---

Kalau lu mau gua bantu:
- Setup project awal (biar tinggal gas)
- Buatkan struktur kode awalnya (Express + React)
- Atau desain UI/UX-nya dulu juga bisa

Mau mulai dari backend dulu atau frontend-nya nih bro?




Oke, untuk setup project awal dengan **Express** (backend) dan **React** (frontend), kita bisa mulai dengan membuat struktur folder dan file yang jelas untuk mempermudah pengembangan ke depannya.

### 1. **Struktur Proyek**
Struktur direktori yang kita buat akan memiliki dua bagian utama: `client` untuk React dan `server` untuk Express.

```bash
/your-project
  ├── /client              # Frontend (React)
  ├── /server              # Backend (Express)
  ├── /node_modules        # Dependencies (both client and server)
  ├── package.json         # Root package.json (opsional)
  └── .gitignore           # Git ignore (opsional)
```

### 2. **Langkah-langkah Setup**

#### 2.1. **Backend: Express Setup**
1. **Buat folder untuk server:**
   ```bash
   mkdir server
   cd server
   ```

2. **Inisialisasi proyek Node.js:**
   ```bash
   npm init -y
   ```

3. **Install Dependencies:**
   Install Express, CORS (untuk mengizinkan komunikasi antara React dan Express), dan MySQL2 untuk koneksi database.
   ```bash
   npm install express mysql2 cors
   ```

4. **Struktur folder server:**
   Buat struktur folder untuk backend:

   ```bash
   server/
     ├── /controllers       # Controller untuk handle logic API
     ├── /models            # Model untuk akses database
     ├── /routes            # Route untuk API
     ├── /middlewares       # Middleware seperti autentikasi
     ├── /config            # Koneksi database
     ├── server.js          # Entry point untuk Express server
   ```

5. **Buat `server.js` untuk menginisialisasi Express:**
   Buat file `server.js` di dalam folder `server/`:

   ```js
   const express = require('express');
   const cors = require('cors');
   const app = express();
   const port = 5000;  // Sesuaikan port sesuai keinginan

   app.use(cors());
   app.use(express.json()); // Untuk handle JSON requests

   // Routes
   const notesRouter = require('./routes/notes');
   app.use('/api/notes', notesRouter); // API route untuk notes

   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

6. **Buat model dan controller untuk Catatan:**
   Di folder `models`, buat file `noteModel.js` untuk berinteraksi dengan database MySQL:

   ```js
   const mysql = require('mysql2');

   const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '', // Kosongkan jika tidak ada password
     database: 'notes_db',  // Nama database
   });

   db.connect((err) => {
     if (err) throw err;
     console.log('Connected to MySQL Database');
   });

   module.exports = db;
   ```

   Di folder `controllers`, buat file `noteController.js` untuk menangani logika API:

   ```js
   const db = require('../models/noteModel');

   // Get all notes
   const getNotes = (req, res) => {
     db.query('SELECT * FROM notes', (err, results) => {
       if (err) {
         res.status(500).json({ message: 'Error retrieving notes', error: err });
       } else {
         res.status(200).json(results);
       }
     });
   };

   // Add a note
   const addNote = (req, res) => {
     const { title, content } = req.body;
     db.query(
       'INSERT INTO notes (title, content) VALUES (?, ?)',
       [title, content],
       (err, results) => {
         if (err) {
           res.status(500).json({ message: 'Error adding note', error: err });
         } else {
           res.status(201).json({ message: 'Note added successfully', data: results });
         }
       }
     );
   };

   module.exports = { getNotes, addNote };
   ```

7. **Buat routes untuk catatan:**
   Di folder `routes`, buat file `notes.js` untuk mendefinisikan rute API:

   ```js
   const express = require('express');
   const router = express.Router();
   const { getNotes, addNote } = require('../controllers/noteController');

   router.get('/', getNotes);  // Get all notes
   router.post('/', addNote);  // Add a new note

   module.exports = router;
   ```

8. **Database Setup:**
   Buat database `notes_db` dan tabel `notes` di MySQL:

   ```sql
   CREATE DATABASE notes_db;
   USE notes_db;

   CREATE TABLE notes (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     content TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

#### 2.2. **Frontend: React Setup**
1. **Buat folder untuk client:**
   Di root project, buat folder untuk React:

   ```bash
   npx create-react-app client
   cd client
   ```

2. **Install Axios untuk request API:**
   Install Axios untuk berkomunikasi dengan backend API:

   ```bash
   npm install axios
   ```

3. **Struktur folder React:**
   Struktur folder untuk frontend bisa seperti ini:

   ```bash
   client/
     ├── /src
       ├── /components       # Komponen untuk tampilan UI
       ├── /services         # Untuk API requests
       ├── App.js            # Komponen utama
       ├── index.js          # Entry point
   ```

4. **Buat API service untuk Catatan:**
   Di dalam `src/services`, buat file `noteService.js` untuk request ke API backend:

   ```js
   import axios from 'axios';

   const API_URL = 'http://localhost:5000/api/notes';

   export const getNotes = async () => {
     try {
       const response = await axios.get(API_URL);
       return response.data;
     } catch (error) {
       console.error('Error fetching notes:', error);
       return [];
     }
   };

   export const addNote = async (note) => {
     try {
       const response = await axios.post(API_URL, note);
       return response.data;
     } catch (error) {
       console.error('Error adding note:', error);
     }
   };
   ```

5. **Buat komponen untuk menampilkan catatan:**
   Di dalam `src/components`, buat file `NotesList.js` untuk menampilkan catatan:

   ```js
   import React, { useEffect, useState } from 'react';
   import { getNotes } from '../services/noteService';

   const NotesList = () => {
     const [notes, setNotes] = useState([]);

     useEffect(() => {
       const fetchNotes = async () => {
         const data = await getNotes();
         setNotes(data);
       };

       fetchNotes();
     }, []);

     return (
       <div>
         <h1>Notes List</h1>
         <ul>
           {notes.map((note) => (
             <li key={note.id}>
               <h3>{note.title}</h3>
               <p>{note.content}</p>
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default NotesList;
   ```

6. **Modifikasi `App.js` untuk menampilkan NotesList:**
   Di `src/App.js`, import dan gunakan `NotesList`:

   ```js
   import React from 'react';
   import NotesList from './components/NotesList';

   function App() {
     return (
       <div className="App">
         <NotesList />
       </div>
     );
   }

   export default App;
   ```

### 3. **Running the Project**
1. **Jalankan backend Express:**
   Dari folder `server`, jalankan perintah:

   ```bash
   node server.js
   ```

2. **Jalankan frontend React:**
   Dari folder `client`, jalankan perintah:

   ```bash
   npm start
   ```

Sekarang aplikasi kamu sudah berjalan dengan backend Express dan frontend React! Kamu bisa mulai menambahkan fitur-fitur seperti login, filter, dan fitur lainnya sesuai kebutuhan.

Ada bagian lain yang ingin dibahas lebih lanjut atau ada masalah dalam setup ini?
