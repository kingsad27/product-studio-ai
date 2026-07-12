import * as dotenv from "dotenv";
import * as path from "path";
import { defineConfig } from "prisma/config";

// Prisma CLI lit .env par défaut, mais Next.js utilise .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Pour les migrations (db push / migrate) : connexion directe obligatoire (port 5432)
    // Le pooler (pgbouncer) bloque les commandes DDL comme CREATE TABLE
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"] ?? "",
  },
});

