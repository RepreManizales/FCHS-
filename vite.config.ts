import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/FCHS-/', // <--- ASEGÚRATE DE AÑADIR ESTA LÍNEA
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
