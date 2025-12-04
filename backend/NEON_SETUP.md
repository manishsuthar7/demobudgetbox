# BudgetBox Backend - Neon Database Setup Guide

## Prerequisites
- Node.js 18+ installed
- A Neon account (free at https://neon.tech)

## Step-by-Step Setup

### 1. Create Neon Project
```
1. Go to https://neon.tech and sign up
2. Click "Create a new project"
3. Choose your region (closest to your users)
4. Wait for the database to be created
5. Copy your connection string
```

### 2. Set Environment Variables
```bash
# Windows: Create .env file in backend/ folder
# Add this line:
DATABASE_URL=postgresql://user:password@ep-xxx.region.neon.tech/dbname?sslmode=require

# Keep PORT as default
PORT=4000
```

### 3. Install Dependencies
```bash
cd backend
npm install
```

### 4. Initialize Database Schema
```bash
# Windows
node setup-db.js

# Or run the batch file
setup-db.bat

# Linux/Mac
bash setup-db.sh
```

### 5. Verify Connection
```bash
npm start
```
You should see:
```
Backend running on 4000
✅ Connected successfully
Demo user created: hire-me@anshumat.org
```

## Connection String Format
```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

Where:
- `user` - Your Neon username
- `password` - Your password
- `host` - Your Neon endpoint (ep-xxx.region.neon.tech)
- `database` - Your database name

## Deployment to Vercel/Railway/Render

### For Vercel
```bash
npm i -g vercel
vercel env add DATABASE_URL
# Paste your Neon connection string
vercel deploy
```

### For Railway
```bash
1. Connect your GitHub repo to Railway.app
2. Add DATABASE_URL env variable in project settings
3. Deploy
```

### For Render
```bash
1. Connect your GitHub repo to render.com
2. Create PostgreSQL service
3. Add DATABASE_URL to environment
4. Deploy
```

## Testing the API

### Health Check
```bash
curl http://localhost:4000/health
```

### Sync Budget
```bash
curl -X POST http://localhost:4000/budget/sync \
  -H "Content-Type: application/json" \
  -d '{
    "month": "2025-12",
    "income": 5000,
    "bills": 1500,
    "food": 500,
    "transport": 200,
    "subscriptions": 100,
    "misc": 300
  }'
```

### Get Latest Budget
```bash
curl http://localhost:4000/budget/latest
```

## Troubleshooting

### Connection Refused
- Check `DATABASE_URL` is correct
- Ensure `.env` file exists in backend root
- Verify Neon project is active

### SSL Certificate Error
- The `?sslmode=require` in connection string is required
- This is automatically included in Neon connection strings

### Demo User Not Created
- Run: `node setup-db.js` again
- Check if `users` table exists: Visit Neon console and verify

## Security Notes
- ⚠️ Never commit `.env` file to git
- ✅ Use `.env.example` for reference
- 🔐 Use strong passwords for production
- 🛡️ Implement proper authentication in production (JWT tokens)

## Next Steps
1. Implement user authentication
2. Add more API endpoints
3. Deploy frontend to Vercel
4. Connect frontend to backend
5. Set up monitoring and logging
