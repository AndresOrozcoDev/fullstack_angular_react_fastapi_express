export const environment = {
  production: true,
  EXPRESS_URL_API: process.env['EXPRESS_URL_API'] || 'http://127.0.0.1:5000/api',
  EXPRESS_API_KEY: process.env['EXPRESS_API_KEY'] || 'dev',
};
