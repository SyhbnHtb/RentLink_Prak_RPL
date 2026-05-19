/**
 * authService.js
 *
 * Service layer untuk autentikasi.
 * Menggunakan API riil untuk komunikasi dengan backend.
 */

import api from './api';

/**
 * Login user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, data?: object, message?: string}>}
 */
export async function login(email, password) {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: "Terjadi kesalahan pada server saat login." };
  }
}

/**
 * Register user baru
 * @param {object} data - { name, email, password }
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function register(data) {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: "Terjadi kesalahan pada server saat registrasi." };
  }
}

/**
 * Logout user (hapus session di server)
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function logout() {
  try {
    const refreshToken = localStorage.getItem('rentlink_refresh_token');
    if (refreshToken) {
      const response = await api.post('/auth/logout', { refreshToken });
      return response.data;
    }
    return { success: true };
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { success: false, message: "Gagal logout dari server." };
  }
}
