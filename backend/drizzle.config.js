import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.js",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  verbose: true,
  strict: true,
})