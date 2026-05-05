# 🏠 RentLink — Platform Penyewaan Berbasis Web

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-v19-61DAFB?style=flat-square&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14+-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-v8-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

Aplikasi platform penyewaan berbasis web yang dibangun dengan arsitektur **REST API** menggunakan Node.js & Express.js sebagai backend dan React.js sebagai frontend.

[🚀 Quick Start](#-quick-start) • [🏗️ Arsitektur](#️-arsitektur-sistem) • [📂 Struktur Folder](#-struktur-folder) • [🌐 API](#-konvensi-api) • [🛠️ Troubleshooting](#️-troubleshooting)

---

## 📋 Table of Contents

- [🤝 Kontributor](#-kontributor)
- [🌟 Overview](#-overview)
- [📦 Tech Stack](#-tech-stack)
- [🏗️ Arsitektur Sistem](#️-arsitektur-sistem)
- [📂 Struktur Folder](#-struktur-folder)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Environment Variables](#️-environment-variables)
- [▶️ Menjalankan Aplikasi](#️-menjalankan-aplikasi)
- [🌐 Konvensi API](#-konvensi-api)
- [🔐 Development Rules](#-development-rules)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [🗺️ Future Roadmap](#️-future-roadmap)

---

## 🤝 Kontributor

|            Nama          |        Role        |
|           ------         |       ------       |
| Syahbana Hatab           | Project Leader     |
| Muhamad Reswara Suryawan | Frontend Developer |
| Josh Peter Sirait        | Backend Developer  |
| Mikail Hikam Altiyar     | UI/UX Designer     |

---

## 🌟 Overview

**RentLink** adalah platform digital yang menghubungkan penyewa dan pemilik properti/barang dalam satu ekosistem terintegrasi. Dibangun dengan pendekatan **REST API** yang memisahkan backend dan frontend secara penuh (*decoupled architecture*).

### ✨ Key Features

- 🏠 **Manajemen Listing** — Kelola item/properti yang disewakan
- 🔐 **Autentikasi JWT** — Login & register yang aman
- 🔎 **Pencarian & Filter** — Temukan sewa yang sesuai kebutuhan
- 📅 **Manajemen Transaksi** — Proses pemesanan & pembayaran
- 👤 **Role-Based Access** — Akses berbeda untuk penyewa dan pemilik
- 📱 **Responsive UI** — Antarmuka yang nyaman di semua perangkat

---

## 📦 Tech Stack

### Backend

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [Node.js](https://nodejs.org/) | v18+ | JavaScript runtime |
| [Express.js](https://expressjs.com/) | v5 | Web framework |
| [PostgreSQL](https://www.postgresql.org/) | v14+ | Relational database |
| [pg](https://node-postgres.com/) | v8 | PostgreSQL client |
| [dotenv](https://github.com/motdotla/dotenv) | v17 | Environment variable loader |
| [cors](https://github.com/expressjs/cors) | v2 | Cross-Origin Resource Sharing |
| [nodemon](https://nodemon.io/) | v3 | Auto-reload saat development |

### Frontend

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [React.js](https://react.dev/) | v19 | UI library |
| [Vite](https://vite.dev/) | v8 | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | v7 | Client-side routing |
| [Axios](https://axios-http.com/) | v1 | HTTP client |

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────┐
│           Browser (Client)                  │
│         React.js + Vite SPA                 │
│  ┌──────────────────────────────────────┐   │
│  │  pages/ │ components/ │ services/   │   │
│  │  hooks/ │ contexts/   │ utils/      │   │
│  └──────────────────────────────────────┘   │
└──────────────────┬──────────────────────────┘
                   │ HTTP / REST API
                   │ (Axios → localhost:5000)
┌──────────────────▼──────────────────────────┐
│         Express.js Server                   │
│  ┌──────────────────────────────────────┐   │
│  │            routes/                   │   │
│  │     (Definisi endpoint API)          │   │
│  └──────────────────┬───────────────────┘   │
│                     │                        │
│  ┌──────────────────▼───────────────────┐   │
│  │          middlewares/                 │   │
│  │  (auth, validasi, error handler)     │   │
│  └──────────────────┬───────────────────┘   │
│                     │                        │
│  ┌──────────────────▼───────────────────┐   │
│  │          controllers/                 │   │
│  │       (Handler tiap request)         │   │
│  └──────────────────┬───────────────────┘   │
│                     │                        │
│  ┌──────────────────▼───────────────────┐   │
│  │    services/ │ models/ │ utils/      │   │
│  │         (Business logic & query)     │   │
│  └──────────────────┬───────────────────┘   │
└──────────────────────┼──────────────────────┘
                       │
         ┌─────────────▼─────────────┐
         │    PostgreSQL Database    │
         │  (localhost:5432/rentlink) │
         └───────────────────────────┘
```

---

## 📂 Struktur Folder

```
RentLink/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Konfigurasi koneksi PostgreSQL (pg.Pool)
│   │   ├── controllers/           # Handler request — satu file per resource
│   │   ├── middlewares/           # Auth JWT, validasi input, error handler
│   │   ├── models/                # Query SQL per tabel/resource
│   │   ├── routes/                # Definisi endpoint API (Express Router)
│   │   ├── services/              # Business logic yang dipanggil controller
│   │   ├── utils/                 # Helper functions (format, generate, dll)
│   │   └── server.js              # Entry point — inisialisasi Express & middleware
│   ├── .env                       # ⚠️ Jangan di-commit ke git
│   ├── .env.example               # Template environment variable
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── public/                    # Aset statis yang langsung di-serve
│   ├── src/
│   │   ├── assets/                # Gambar, font, ikon
│   │   ├── components/            # Komponen UI yang dapat digunakan ulang
│   │   ├── contexts/              # React Context API (state global)
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── pages/                 # Komponen halaman penuh (1 file = 1 route)
│   │   ├── services/              # Fungsi pemanggilan API via Axios
│   │   ├── utils/                 # Helper functions (format tanggal, validasi, dll)
│   │   ├── App.jsx                # Root component & konfigurasi routing
│   │   ├── App.css                # Style global
│   │   ├── index.css              # CSS reset & variabel
│   │   └── main.jsx               # Entry point — render React ke DOM
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prasyarat

Pastikan sudah menginstal:
- [Node.js](https://nodejs.org/) **v18** atau lebih baru
- [PostgreSQL](https://www.postgresql.org/) **v14** atau lebih baru
- npm **v9** atau lebih baru (sudah termasuk di Node.js)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/SyhbnHtb/RentLink_Prak_RPL.git
cd RentLink
```

### 2️⃣ Setup Database

Buat database PostgreSQL bernama `rentlink`:

```sql
CREATE DATABASE rentlink;
```

### 3️⃣ Setup Backend

```bash
cd backend
npm install
```

Salin file environment:

```bash
cp .env.example .env
```

Edit file `.env` dan sesuaikan nilainya (lihat [Environment Variables](#️-environment-variables)).

### 4️⃣ Setup Frontend

```bash
cd ../frontend
npm install
```

---

## ⚙️ Environment Variables

### Backend — `backend/.env`

| Variable | Default | Keterangan |
|----------|---------|------------|
| `PORT` | `5000` | Port Express server |
| `DB_HOST` | `localhost` | Host PostgreSQL |
| `DB_PORT` | `5432` | Port PostgreSQL |
| `DB_NAME` | `rentlink` | Nama database |
| `DB_USER` | `postgres` | Username database |
| `DB_PASSWORD` | *(wajib diisi)* | Password database |

Contoh isi file `.env`:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=rentlink
DB_USER=postgres
DB_PASSWORD=yourpassword
```

### Frontend — `frontend/.env.local` *(opsional)*

| Variable | Default | Keterangan |
|----------|---------|------------|
| `VITE_API_URL` | `http://localhost:5000/api` | Base URL backend API |

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Menjalankan Aplikasi

Jalankan backend dan frontend di **dua terminal terpisah**.

### Terminal 1 — Backend

```bash
cd backend

# Mode development (auto-reload dengan nodemon)
npm run dev

# Mode production
npm start
```

Backend berjalan di: **`http://localhost:5000`**

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Frontend berjalan di: **`http://localhost:5173`**

### Semua Scripts

| Direktori | Script | Keterangan |
|-----------|--------|------------|
| `backend` | `npm run dev` | Jalankan server dengan nodemon (auto-reload) |
| `backend` | `npm start` | Jalankan server tanpa auto-reload |
| `frontend` | `npm run dev` | Jalankan Vite dev server |
| `frontend` | `npm run build` | Build untuk production |
| `frontend` | `npm run preview` | Preview hasil build |
| `frontend` | `npm run lint` | Jalankan ESLint |

---

## 🌐 Konvensi API

### Base URL

```
http://localhost:5000/api
```

### Penamaan Endpoint

Gunakan **kebab-case** dan **noun** (bukan verb) untuk nama resource:

```
GET    /api/items            → ambil semua item
GET    /api/items/:id        → ambil satu item
POST   /api/items            → buat item baru
PUT    /api/items/:id        → update item
DELETE /api/items/:id        → hapus item
```

### Format Response

Semua response menggunakan format JSON yang konsisten:

```json
// ✅ Sukses
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": { }
}

// ❌ Error
{
  "success": false,
  "message": "Item tidak ditemukan",
  "error": "NOT_FOUND"
}
```

### HTTP Status Code

| Status | Keterangan |
|--------|------------|
| `200` | OK — request berhasil |
| `201` | Created — resource berhasil dibuat |
| `400` | Bad Request — input tidak valid |
| `401` | Unauthorized — belum login / token tidak valid |
| `403` | Forbidden — tidak punya izin |
| `404` | Not Found — resource tidak ditemukan |
| `500` | Internal Server Error — kesalahan di server |

---

## 🔐 Development Rules

> ⚠️ **WAJIB DIBACA** oleh semua anggota tim sebelum mulai coding.

| Rule | Keterangan |
|------|------------|
| 🚫 **Jangan commit `.env`** | File `.env` berisi kredensial — selalu ada di `.gitignore` |
| 📛 **Gunakan konvensi penamaan** | camelCase untuk JS, kebab-case untuk URL, snake_case untuk kolom DB |
| 🌿 **Branch per fitur** | Jangan langsung push ke `main` — buat branch dulu |
| 🔄 **Pull sebelum push** | Selalu `git pull` sebelum mulai kerja untuk menghindari konflik |
| ✅ **Test sebelum commit** | Pastikan tidak ada error sebelum commit |
| 📝 **Pesan commit yang jelas** | Ikuti konvensi commit message di bawah |

### Git Workflow

```bash
# Buat branch baru untuk setiap fitur
git checkout -b feature/nama-fitur

# Setelah selesai, commit dengan pesan yang jelas
git add .
git commit -m "feat(auth): tambah endpoint login"

# Push dan buat Pull Request ke main
git push origin feature/nama-fitur
```

### Konvensi Commit Message

```
feat(scope): deskripsi singkat fitur baru
fix(scope): deskripsi singkat bug yang diperbaiki
docs(readme): update panduan instalasi
refactor(auth): sederhanakan middleware validasi
style(frontend): rapikan komponen Card
```

---

## 🛠️ Troubleshooting

<details>
<summary><strong>❌ Error: Cannot connect to database</strong></summary>

Pastikan PostgreSQL sudah berjalan dan nilai di `.env` sudah benar:

```bash
# Cek apakah PostgreSQL aktif
pg_isready -h localhost -p 5432

# Test koneksi manual
psql -U postgres -d rentlink
```

Cek juga apakah database `rentlink` sudah dibuat dengan `CREATE DATABASE rentlink;`.

</details>

<details>
<summary><strong>❌ Error: Port 5000 already in use</strong></summary>

Ganti port di file `.env`:

```env
PORT=5001
```

Atau matikan proses yang menggunakan port 5000:

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill
```

</details>

<details>
<summary><strong>❌ CORS error di browser</strong></summary>

Pastikan di `backend/src/server.js` CORS sudah dikonfigurasi dengan origin frontend:

```js
app.use(cors({
  origin: 'http://localhost:5173',
}));
```

</details>

<details>
<summary><strong>❌ Module not found setelah clone</strong></summary>

Jalankan `npm install` di **kedua** direktori:

```bash
cd backend && npm install
cd ../frontend && npm install
```

</details>

<details>
<summary><strong>❌ Frontend tidak bisa fetch ke backend</strong></summary>

Pastikan:
1. Backend sudah berjalan di `http://localhost:5000`
2. `VITE_API_URL` di `frontend/.env.local` sudah benar
3. Tidak ada typo di URL endpoint

</details>

---

## 🗺️ Future Roadmap

- [ ] 🔐 Autentikasi JWT — login, register, refresh token
- [ ] 📸 Upload foto item — integrasi cloud storage
- [ ] 💬 Sistem review & rating
- [ ] 📅 Kalender ketersediaan item
- [ ] 💳 Integrasi payment gateway
- [ ] 🔔 Notifikasi real-time
- [ ] 📊 Dashboard analitik untuk pemilik
- [ ] 📱 Progressive Web App (PWA)

---

## 📚 Referensi

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Vite Documentation](https://vite.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/docs/intro)
