# Enervion

Enervion is a **full-stack MERN (MongoDB, Express, React, Node.js) application** for electric vehicles, renewable energy systems, and accessories. The project includes a React frontend deployed on **Vercel** and an Express backend deployed on **Render**, with MongoDB Atlas as the database.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://enervion-3lq2.vercel.app/](https://enervion-3lq2.vercel.app/)  
- **Backend API (Render):** [https://enervion.onrender.com](https://enervion.onrender.com)  

---

## 📂 Project Structure
enervion/
├─ enervion-frontend/ # React frontend
│ ├─ public/ # static assets
│ ├─ src/
│ │ ├─ components/ # reusable UI components
│ │ ├─ pages/ # page components
│ │ ├─ routes/ # React Router
│ │ ├─ context/ # React Context (Cart, Theme)
│ │ ├─ hooks/ # custom hooks
│ │ └─ utils/ # utility functions
├─ enervion-backend/ # Node.js + Express backend
│ ├─ src/
│ │ ├─ config/ # database config
│ │ ├─ controllers/ # route controllers
│ │ ├─ models/ # Mongoose schemas
│ │ ├─ routes/ # Express routes
│ │ ├─ middlewares/ # error handling, auth
│ │ └─ utils/ # helper functions
├─ docker-compose.yml # optional Docker setup
├─ .github/workflows/ # CI/CD pipelines
├─ README.md
└─ .env.example


---

## 🛠️ Technologies Used

- **Frontend:** React, Vite, TailwindCSS, Framer Motion  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Deployment:** Vercel (frontend), Render (backend)  
- **Other Tools:** Axios, Helmet, CORS, Rate Limiting, dotenv  

---

## ⚙️ Features

- Browse products, services, and details  
- Add products to cart and checkout orders  
- Contact form and newsletter subscription  
- Responsive and mobile-friendly UI  
- Admin routes (placeholder for future JWT-based auth)  
- SPA routing handled with React Router  

---

## 💻 Installation (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/JEFFMURITHI/enervion.git
cd enervion

## 2. Backend Setup
cd enervion-backend
cp .env.example .env
# Fill in your MongoDB URI and allowed origins
npm install
npm run dev

3. Frontend Setup
cd ../enervion-frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000
npm install
npm run dev

🌐 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Environment Variables:
Vercel (frontend):VITE_API_URL=https://enervion.onrender.com
Render (backend):ALLOWED_ORIGINS=https://enervion-3lq2.vercel.app/
MONGO_URI=<your MongoDB URI>
PORT=5000
NODE_ENV=production

📝 API Endpoints (Backend)

GET /api/products - Get all products

GET /api/services - Get all services

POST /api/contact - Submit contact form

POST /api/newsletter - Subscribe to newsletter

POST /api/orders - Submit new order

🔧 Scripts

Backend:npm run dev      # start backend in dev mode
npm start        # start backend in production
npm run seed     # seed sample data

Frontend:npm run dev      # start frontend in dev mode
npm run build    # build frontend for production
npm run preview  # preview production build

✅ Best Practices

Always test frontend routes after deployment (SPA reload issue handled with vercel.json)

Monitor Render logs for backend errors

Keep .env files secret; never push to GitHub

Use Docker if deploying locally with containers

👤 Author

Jeff Murithi

GitHub: https://github.com/JEFFMURITHI

LinkedIn: www.linkedin.com/in/jeff-murithi-15aa52226

📄 License

MIT License © 2025 Jeff Murithi

---

You can now **copy this directly** to `enervion/README.md` and commit it.  

If you want, I can also **add screenshots, features table, and badges** (like Vercel build status, license, and tech stack) to make it look more professional.  

Do you want me to do that next?



