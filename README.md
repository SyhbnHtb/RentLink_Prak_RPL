# RentLink - Apartment Rental & Billing System

RentLink adalah sistem manajemen penyewaan unit/apartemen berbasis web yang digunakan untuk mengelola data unit, penyewa, kontrak, meteran, tagihan, pembayaran, riwayat transaksi, dashboard, laporan keuangan, serta profil pengguna.

Project ini dikembangkan untuk kebutuhan Praktikum Rekayasa Perangkat Lunak dengan pembagian role utama:

- Admin
- Penyewa

---

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- Supabase
- JWT Authentication
- Bcrypt
- Multer
- Express Validator
- CORS
- Dotenv
- Nodemon

### Frontend

- Disesuaikan dengan desain UI/UX RentLink
- Integrasi API backend menggunakan endpoint yang tersedia

---

## Struktur Project

```txt
RentLink
├── backend
│   └── backend
│       ├── src
│       │   ├── config
│       │   │   └── db.js
│       │   ├── controllers
│       │   ├── middlewares
│       │   ├── models
│       │   ├── routes
│       │   ├── services
│       │   ├── utils
│       │   ├── validators
│       │   └── server.js
│       ├── uploads
│       ├── .env
│       ├── package-lock.json
│       └── package.json
├── frontend
├── .gitignore
└── README.md
```

---

## Fitur Backend

### Authentication & Authorization

Backend mendukung autentikasi dan otorisasi berbasis JWT.

Fitur:

- Register user
- Login user
- JWT access token
- Refresh token
- Logout
- Role-based access control
- Role admin
- Role penyewa

Endpoint:

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/logout
```

---

### Middleware

Backend menggunakan middleware berikut:

- `verifyToken` untuk autentikasi JWT
- `isAdmin` untuk membatasi akses khusus admin
- `errorHandler` untuk error handling terpusat
- `notFound` untuk route yang tidak ditemukan
- `uploadMiddleware` untuk upload bukti pembayaran
- `validationMiddleware` untuk validasi request payload

---

### Manajemen Unit

Admin dapat mengelola data unit.

Fitur:

- Lihat semua unit
- Lihat detail unit
- Tambah unit
- Edit unit
- Hapus unit
- Status unit tersedia/terisi
- Data lantai unit
- Tanggal dibuat unit

Endpoint:

```txt
GET    /api/unit
GET    /api/unit/:id
POST   /api/unit
PUT    /api/unit/:id
DELETE /api/unit/:id
```

Contoh body tambah unit:

```json
{
  "nama_unit": "Kamar 102",
  "tipe": "Kamar",
  "lantai": 1,
  "harga": 2000000,
  "status": "tersedia"
}
```

---

### Manajemen Penyewa

Admin dapat mengelola data penyewa.

Fitur:

- Lihat semua penyewa
- Lihat detail penyewa
- Tambah penyewa
- Edit penyewa
- Hapus penyewa
- Penyewa dapat melihat unit sendiri
- Penyewa dapat melihat kontrak sendiri

Endpoint:

```txt
GET    /api/penyewa
GET    /api/penyewa/:id
POST   /api/penyewa
PUT    /api/penyewa/:id
DELETE /api/penyewa/:id

GET    /api/penyewa/unit-saya
GET    /api/penyewa/kontrak-saya
```

Contoh body tambah penyewa:

```json
{
  "name": "Budi Santoso",
  "email": "budi@rentlink.com",
  "password": "budi12345",
  "phone": "081234567891"
}
```

---

### Manajemen Kontrak

Admin dapat mengelola kontrak antara penyewa dan unit.

Fitur:

- Lihat semua kontrak
- Lihat detail kontrak
- Buat kontrak
- Edit kontrak
- Hapus kontrak
- Akhiri kontrak
- Saat kontrak aktif dibuat, unit dapat berubah menjadi terisi
- Saat kontrak diakhiri, unit berubah kembali menjadi tersedia
- Format kode kontrak `C-001`

Endpoint:

```txt
GET    /api/kontrak
GET    /api/kontrak/:id
POST   /api/kontrak
PUT    /api/kontrak/:id
DELETE /api/kontrak/:id
PUT    /api/kontrak/:id/akhiri
```

Contoh body buat kontrak:

```json
{
  "user_id": 2,
  "unit_id": 1,
  "tgl_mulai": "2026-05-01",
  "tgl_akhir": "2027-05-01",
  "status": "aktif"
}
```

---

### Manajemen Meteran

Admin dapat menginput dan mengelola data meteran listrik dan air.

Endpoint:

```txt
GET    /api/meteran
GET    /api/meteran/:id
POST   /api/meteran
PUT    /api/meteran/:id
DELETE /api/meteran/:id
```

Contoh body tambah meteran:

```json
{
  "unit_id": 1,
  "bulan": "Mei",
  "tahun": 2026,
  "meter_listrik_awal": 100,
  "meter_listrik_akhir": 150,
  "meter_air_awal": 20,
  "meter_air_akhir": 35
}
```

---

### Tagihan

Admin dapat generate tagihan berdasarkan kontrak aktif dan data meteran.

Fitur:

- Generate tagihan otomatis
- Lihat semua tagihan
- Lihat tagihan milik penyewa
- Lihat detail tagihan
- Hapus tagihan
- Filter tagihan berdasarkan status
- Filter berdasarkan bulan dan tahun
- Search berdasarkan nama penyewa, email, unit, atau periode
- Sort berdasarkan terbaru, terlama, total terbesar, dan total terkecil
- Format kode invoice `INV-001`

Endpoint:

```txt
POST   /api/tagihan/generate
GET    /api/tagihan
GET    /api/tagihan/me
GET    /api/tagihan/:id
DELETE /api/tagihan/:id
```

Query filter:

```txt
GET /api/tagihan?search=Budi
GET /api/tagihan?status=belum
GET /api/tagihan?bulan=Mei&tahun=2026
GET /api/tagihan?sort=total_terbesar
```

Contoh body generate tagihan:

```json
{
  "kontrak_id": 1,
  "bulan": "Mei",
  "tahun": 2026
}
```

Status tagihan:

```txt
belum
pending
lunas
```

---

### Pembayaran

Penyewa dapat upload bukti pembayaran. Admin dapat memverifikasi pembayaran.

Endpoint:

```txt
POST /api/pembayaran/upload
GET  /api/pembayaran
GET  /api/pembayaran/:id
PUT  /api/pembayaran/verifikasi/:id
```

Contoh upload pembayaran:

```txt
POST /api/pembayaran/upload
Body: form-data
tagihan_id: 1
bukti: file jpg/png/pdf
```

Contoh body verifikasi:

```json
{
  "status": "lunas"
}
```

atau:

```json
{
  "status": "ditolak"
}
```

---

### Riwayat Pembayaran

Admin dapat melihat seluruh riwayat pembayaran. Penyewa hanya dapat melihat riwayat pembayaran miliknya sendiri.

Endpoint:

```txt
GET /api/pembayaran/riwayat
GET /api/pembayaran/riwayat/me
```

Query filter:

```txt
GET /api/pembayaran/riwayat?search=Budi
GET /api/pembayaran/riwayat?status=lunas
GET /api/pembayaran/riwayat?bulan=Mei&tahun=2026
GET /api/pembayaran/riwayat?sort=terbaru
```

---

### Dashboard Admin

Admin dapat melihat statistik ringkas sistem.

Endpoint:

```txt
GET /api/dashboard/admin/stats
```

---

### Dashboard Penyewa

Penyewa dapat melihat ringkasan dashboard miliknya.

Endpoint:

```txt
GET /api/dashboard/penyewa/stats
```

---

### Laporan Keuangan

Admin dapat melihat laporan keuangan dari pembayaran yang sudah lunas.

Endpoint:

```txt
GET /api/laporan/keuangan
GET /api/laporan/keuangan?bulan=Mei&tahun=2026
```

---

### Profile / Biodata

Admin dan penyewa dapat melihat serta mengubah data profil masing-masing.

Endpoint:

```txt
GET /api/profile/me
PUT /api/profile/me
PUT /api/profile/change-password
```

Contoh body update profile:

```json
{
  "name": "Budi Santoso",
  "email": "budi@rentlink.com",
  "phone": "081234567891",
  "ktp": "910216769",
  "asal": "Ngawi"
}
```

Contoh body ganti password:

```json
{
  "old_password": "budi12345",
  "new_password": "budi54321",
  "confirm_password": "budi54321"
}
```

---

## Database Schema

Database menggunakan PostgreSQL melalui Supabase.

### users

```txt
id_user
name
email
password
role
phone
ktp
asal
```

Role:

```txt
admin
penyewa
```

### unit

```txt
id_unit
nama_unit
tipe
lantai
harga
status
created_at
```

Status unit:

```txt
tersedia
terisi
```

### kontrak

```txt
id_kontrak
user_id
unit_id
tgl_mulai
tgl_akhir
status
```

Status kontrak:

```txt
aktif
selesai
```

### meteran

```txt
id_meteran
unit_id
bulan
tahun
meter_listrik_awal
meter_listrik_akhir
meter_air_awal
meter_air_akhir
```

### tagihan

```txt
id_tagihan
kontrak_id
periode
biaya_sewa
biaya_listrik
biaya_air
total
status
created_at
```

Status tagihan:

```txt
belum
pending
lunas
```

### pembayaran

```txt
id_pembayaran
tagihan_id
tanggal
bukti
status
created_at
```

Status pembayaran:

```txt
pending
ditolak
lunas
```

### refresh_tokens

```txt
id_refresh_token
user_id
token
expires_at
created_at
```

---

## Environment Variables

Buat file `.env` di:

```txt
backend/backend/.env
```

Contoh konfigurasi:

```env
PORT=5000

DB_HOST=your_database_host
DB_PORT=6543
DB_NAME=postgres
DB_USER=your_database_user
DB_PASSWORD=your_database_password

JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

TARIF_LISTRIK_PER_KWH=1500
TARIF_AIR_PER_M3=5000
```

Catatan:

```txt
Jangan push file .env ke GitHub.
Pastikan .env masuk ke .gitignore.
```

---

## Instalasi Backend

Masuk ke folder backend:

```bash
cd backend/backend
```

Install dependencies:

```bash
npm install
```

Jalankan server development:

```bash
npm run dev
```

Server berjalan di:

```txt
http://localhost:5000
```

---

## Endpoint Testing Dasar

Test server:

```txt
GET http://localhost:5000/
```

Expected response:

```json
{
  "success": true,
  "message": "API RentLink berjalan!"
}
```

Test health check:

```txt
GET http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server RentLink aktif"
}
```

---

## Alur Testing Utama

Urutan testing backend RentLink:

```txt
1. Register admin
2. Update role admin di database
3. Login admin
4. Tambah unit
5. Tambah penyewa
6. Buat kontrak aktif
7. Input meteran
8. Generate tagihan
9. Login penyewa
10. Penyewa melihat tagihan
11. Penyewa upload bukti pembayaran
12. Admin melihat pembayaran
13. Admin verifikasi pembayaran
14. Admin melihat dashboard
15. Admin melihat laporan keuangan
16. Penyewa melihat dashboard penyewa
17. User melihat dan edit profile
18. User mengganti password
```

---

## Keamanan

Backend RentLink sudah menerapkan:

- Password hashing menggunakan bcrypt
- JWT authentication
- Refresh token
- Role-based access control
- Validasi request payload
- File upload validation
- Error handling terpusat
- Proteksi endpoint admin
- Proteksi endpoint penyewa

---

## Catatan GitHub

File/folder yang tidak boleh dipush:

```txt
.env
node_modules/
uploads/
```

Contoh `.gitignore`:

```gitignore
node_modules/
backend/backend/node_modules/

.env
.env.local
backend/backend/.env
backend/backend/.env.local

uploads/
backend/backend/uploads/

dist/
build/

*.log
npm-debug.log*
```

---

## Status Pengembangan Backend

Backend RentLink saat ini sudah mendukung modul:

```txt
KAN-39  Pengembangan sistem role
KAN-40  Sistem authentication
KAN-43  Database riwayat
KAN-52  Inisialisasi backend
KAN-53  Endpoint register
KAN-54  Endpoint login
KAN-55  JWT verification & RBAC
KAN-56  Logout & refresh token
KAN-57  Manajemen Unit CRUD
KAN-58  Manajemen Penyewa CRUD
KAN-59  Manajemen Kontrak CRUD
KAN-60  Manajemen Meteran CRUD
KAN-61  Generate Tagihan Otomatis
KAN-62  Lihat Tagihan
KAN-63  Upload Bukti Pembayaran
KAN-64  Verifikasi Pembayaran
KAN-65  Riwayat Pembayaran
KAN-66  Statistik Dashboard Admin
KAN-67  Laporan Keuangan
KAN-68  Error Handling Middleware Terpusat
KAN-69  Validasi Request Payload
KAN-70  Update Schema Tambahan UI
KAN-71  Profile/Biodata & Ganti Password
KAN-72  Dashboard Penyewa
KAN-73  Unit Saya & Kontrak Saya
KAN-74  Filter Search Sort Tagihan dan Riwayat
KAN-75  Akhiri Kontrak & Hapus Tagihan
KAN-76  Format Kode Invoice dan Kode Kontrak
```

---

## Developer

Project: RentLink  
Role: Backend Developer  
Repository: RentLink_Prak_RPL
