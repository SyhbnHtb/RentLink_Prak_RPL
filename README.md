# RentLink

Aplikasi platform penyewaan berbasis web yang dibangun dengan Node.js, Express.js, dan React.js.

## Tech Stack

**Frontend**
- React.js (dengan Vite)
- React Router DOM
- Axios

**Backend**
- Node.js
- Express.js
- PostgreSQL (via `pg`)

## Struktur Folder

```
RentLink/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Konfigurasi koneksi database
│   │   ├── controllers/        # Logic handler untuk setiap route
│   │   ├── middlewares/        # Middleware (auth, error handler, dll)
│   │   ├── models/             # Query / model database
│   │   ├── routes/             # Definisi route API
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Helper / utility functions
│   │   └── server.js           # Entry point server
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/             # Gambar, font, dan file statis
    │   ├── components/         # Komponen UI yang dapat digunakan ulang
    │   ├── contexts/           # React Context (state global)
    │   ├── hooks/              # Custom hooks
    │   ├── pages/              # Halaman utama aplikasi
    │   ├── services/           # Fungsi pemanggilan API (Axios)
    │   ├── utils/              # Helper functions
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Prasyarat

Pastikan sudah menginstal:
- [Node.js](https://nodejs.org/) v18 atau lebih baru
- [PostgreSQL](https://www.postgresql.org/) v14 atau lebih baru

## Instalasi

### 1. Clone repositori

```bash
git clone https://github.com/SyhbnHtb/RentLink_Prak_RPL.git
cd RentLink
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` dari template:

```bash
cp .env.example .env
```

Isi nilai variabel di file `.env`:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=rentlink
DB_USER=postgres
DB_PASSWORD=yourpassword
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

## Menjalankan Aplikasi

### Backend

```bash
cd backend

# Mode development (dengan auto-reload)
npm run dev

# Mode production
npm start
```

Server berjalan di: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm run dev
```

Aplikasi berjalan di: `http://localhost:5173`

## Scripts

| Direktori  | Script          | Keterangan                        |
|------------|-----------------|-----------------------------------|
| `backend`  | `npm run dev`   | Jalankan server dengan nodemon    |
| `backend`  | `npm start`     | Jalankan server (production)      |
| `frontend` | `npm run dev`   | Jalankan Vite dev server          |
| `frontend` | `npm run build` | Build untuk production            |
| `frontend` | `npm run lint`  | Jalankan ESLint                   |
