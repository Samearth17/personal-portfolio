import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const endpoint = env.VITE_CONTACT_ENDPOINT?.trim();
  if (endpoint && !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)) {
    throw new Error(
      'VITE_CONTACT_ENDPOINT must be a public Formspree /f/ endpoint, or empty for email-draft mode.',
    );
  }
  return {
    plugins: [react(), tailwindcss()],
    server: { host: '127.0.0.1', port: 5221, strictPort: true },
    preview: { host: '127.0.0.1', port: 5221, strictPort: true },
    build: { outDir: 'build', sourcemap: false },
  };
});
