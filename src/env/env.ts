export const env = {
  production: false,
  apiUrl: (window as any).__env?.API_URL || (window as any).__env?.apiUrl || 'http://localhost:8080/api'
};
