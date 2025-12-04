💰 BudgetBox — Local-First Budget Planner

BudgetBox is a local-first personal budgeting application that works even when offline.
Your data is stored on your device, and you can sync it to the server whenever you’re online.

🌍 Live Links
Service	URL
Frontend (Vercel)	[https://demobudgetbox.vercel.app](https://demobudgetbox.vercel.app/)

Backend (Render)	[https://demobudgetbox-main.onrender.com](https://render.com/)

🔐 Demo Login (Required for Reviewers)
Email:    hire-me@anshumat.org
Password: HireMe@2025!

📁 Project Structure
/
├─ frontend   # Next.js 15, React 18, Zustand, Tailwind
├─ backend    # Node.js, Express, PostgreSQL (Neon)
└─ README.md

🧱 Architecture Diagram

   <img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/ccbc822e-786b-4cf7-8f1d-426c600d2d8d" />


🔥 Features
| Feature                        | Status |
| ------------------------------ | :----: |
| Offline-first budget editor    |    ✔   |
| Auto-save to IndexedDB         |    ✔   |
| Online sync with backend       |    ✔   |
| Per-month budgets              |    ✔   |
| Demo login for evaluation      |    ✔   |
| Data visualization (Pie chart) |    ✔   |
| Rule-based spending warnings   |    ✔   |


1️⃣ Login using the demo account

2️⃣ Select a month (e.g. December 2025)

3️⃣ Enter values — auto-saved locally

4️⃣ Turn Wi-Fi OFF or DevTools → Network → “Offline”

5️⃣ Edit values again

✔ App still works

✔ Values persist on refresh

6️⃣ Turn Wi-Fi ON

7️⃣ Click Sync

✔ Data saved to server

You can click Get Latest to confirm server values.

⚙️ Setup Instructions (Local Development)

Clone Repository

```bash
git clone https://github.com/manishsuthar7/demobudgetbox
cd demobudgetbox
```

Backend Setup
```bash
cd backend
npm install
```

Create backend/.env:
```env
DATABASE_URL=<your_neon_connection_string>
PORT=4000
JWT_SECRET=supersecret
```

Run database scripts (schema + seed demo user):
```bash
schema.sql
seed.sql
```

Start backend:
```bash
npm run build
npm start
```

Backend health check:
```bash
http://localhost:4000/health
```
Frontend Setup
```bash
cd ../frontend
npm install
```

Create frontend/.env.local:
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000

```
Start frontend:
```bash
npm run dev

```
Open browser:
👉 http://localhost:3000

📊 Dashboard Preview
<img width="1907" height="970" alt="image" src="https://github.com/user-attachments/assets/fb2c3033-42e3-4579-975b-db76d2cc96d4" />
<img width="1898" height="971" alt="image" src="https://github.com/user-attachments/assets/20414561-8864-416b-b071-117c73938161" />
[![Watch the demo]([https://img.youtube.com/vi/<VIDEO_ID>/0.jpg)](https://youtu.be/<VIDEO_ID>](https://youtu.be/ivO6aD4eA7c?si=nhfBqDLUQKqDhunQ))



🔌 API Endpoints
POST /login

Body:
```bash
{ "email": "hire-me@anshumat.org", "password": "HireMe@2025!" }
```
POST /budget/sync

Saves monthly budget to server

GET /budget/latest?month=December%202025

Loads server copy for the selected month

🏁 Conclusion

✔ Fully functional local-first budget tracker
✔ Sync + offline modes tested
✔ Meets the requirements of the assignment
✔ Hosted public demo included

If you liked this project, please ⭐ the repo 😄

👨‍💻 Author

Manish Suthar
Frontend / Full-Stack Developer
India 🇮🇳
