@echo off
REM setup-db.bat - Initialize Neon database schema (Windows)

echo 📦 Installing dependencies...
npm install

echo 🔨 Building TypeScript...
npm run build

echo 🗄️ Running database setup...
node setup-db.js

echo 🎉 Database is ready!
