/**
 * authService.js
 *
 * Service layer untuk autentikasi.
 * Saat ini menggunakan mock — nanti tinggal ganti body fungsi dengan API call.
 */

// TODO: import axios dan konfigurasi baseURL
// import axios from 'axios';
// const API = axios.create({ baseURL: '/api' });

const MOCK_ACCOUNTS = [
  { id: 1, username: "admin",  password: "admin123", name: "Admin",  email: "admin@rentlink.com",  role: "admin" },
  { id: 2, username: "nasir",  password: "nasir123", name: "Nasir",  email: "nasir@rentlink.com",  role: "user"  },
  { id: 3, username: "rusdi",  password: "rusdi123", name: "Rusdi",  email: "rusdi@rentlink.com",  role: "user"  },
];

/**
 * Login user
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{success: boolean, user?: object, message?: string}>}
 */
export async function login(username, password) {
  // TODO: replace with API call
  // const response = await API.post('/auth/login', { username, password });
  // return response.data;

  await new Promise((r) => setTimeout(r, 500)); // Simulasi network delay

  const found = MOCK_ACCOUNTS.find(
    (acc) =>
      acc.username.toLowerCase() === username?.toLowerCase() &&
      acc.password === password
  );

  if (!found) {
    return { success: false, message: "Username atau password salah." };
  }

  const { password: _, ...userData } = found;
  return { success: true, user: userData };
}

/**
 * Register user baru
 * @param {object} data - { username, email, password, confirmPassword }
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function register(data) {
  // TODO: replace with API call
  // const response = await API.post('/auth/register', data);
  // return response.data;

  await new Promise((r) => setTimeout(r, 500));

  if (MOCK_ACCOUNTS.find((a) => a.username === data.username)) {
    return { success: false, message: "Username sudah terdaftar." };
  }

  return { success: true, message: "Registrasi berhasil! Silakan verifikasi email Anda." };
}

/**
 * Logout user (hapus session di server)
 * @returns {Promise<void>}
 */
export async function logout() {
  // TODO: replace with API call
  // await API.post('/auth/logout');
  return;
}
