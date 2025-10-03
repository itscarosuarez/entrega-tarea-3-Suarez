export const API_CONFIG = {
  BASE_URL: 'http://192.168.0.121:3000',
  ENDPOINTS: {
    ARTE: '/arte'
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};