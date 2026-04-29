# RentLink — Frontend

Antarmuka pengguna RentLink yang dibangun dengan React.js dan Vite.

## Tech Stack

- [React.js](https://react.dev/) — UI library
- [Vite](https://vite.dev/) — Build tool dan dev server
- [React Router DOM](https://reactrouter.com/) — Client-side routing
- [Axios](https://axios-http.com/) — HTTP client untuk pemanggilan API

## Struktur Folder

```
src/
├── assets/         # Gambar, font, dan file statis
├── components/     # Komponen UI yang dapat digunakan ulang
├── contexts/       # React Context (state global)
├── hooks/          # Custom hooks
├── pages/          # Halaman utama aplikasi
├── services/       # Fungsi pemanggilan API (Axios)
├── utils/          # Helper functions
├── App.jsx         # Root component dan konfigurasi routing
└── main.jsx        # Entry point aplikasi
```

## Instalasi

```bash
npm install
```

## Scripts

| Script            | Keterangan                       |
|-------------------|----------------------------------|
| `npm run dev`     | Jalankan Vite dev server         |
| `npm run build`   | Build untuk production           |
| `npm run preview` | Preview hasil build              |
| `npm run lint`    | Jalankan ESLint                  |

## Koneksi ke Backend

Pastikan backend sudah berjalan di `http://localhost:5000` sebelum menjalankan frontend.

Untuk mengatur base URL API, buat file `.env.local` di direktori ini:

```env
VITE_API_URL=http://localhost:5000/api
```

Kemudian gunakan variabel tersebut di `src/services/`:

```js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default api
```
