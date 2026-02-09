import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        '**/*.stories.tsx',
        '**/*.stories.ts',
        '**/*.config.ts',
        '**/*.config.js',
        '**/vite-env.d.ts',
        'src/main.tsx',
        '.storybook/',
        'src/stories/**',
        'src/types/**',
        'eslint.config.js',
        '**/*.d.ts',
        'dist/**',
      ],
      thresholds: {
        lines: 50,
        functions: 45,
        branches: 50,
        statements: 50,
      },
    },
  },
});
