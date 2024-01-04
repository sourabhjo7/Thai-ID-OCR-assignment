import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  // Other Vite configuration options...
});
