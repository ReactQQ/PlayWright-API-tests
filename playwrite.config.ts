import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['list'], ['html']],
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com'
  }
});