// API Configuration
// Update this URL when you deploy your Python backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  games: `${API_BASE_URL}/api/games`,
  calculatePrice: `${API_BASE_URL}/api/calculate-price`,
  booking: `${API_BASE_URL}/api/booking`,
};
