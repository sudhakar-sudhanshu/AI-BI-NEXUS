# AI BI Nexus

A full-stack AI-powered business intelligence platform that helps turn raw data into clear insights, visualizations, and decisions.

---

## What this project does

AI BI Nexus allows users to upload datasets, explore them through dashboards, generate charts, and even interact with the data using an AI chat interface.

Instead of just showing numbers, the system explains what the data means.

---

## Why I built this

Most dashboards only display data.
I wanted to build something that actually helps **understand** the data.

This project combines:

* data analysis
* visualization
* AI-based interpretation

into one single platform.

---

## Main features

* Upload CSV/Excel data
* Dashboard with key metrics (total, average, max, trends)
* Interactive charts (bar and line)
* AI chat to ask questions about your data
* AI-generated insights and summaries
* Report generation with dataset preview
* Power BI integration for advanced analytics
* Settings and profile management

---

## Tech stack

Frontend

* Next.js
* React
* Tailwind CSS

Backend

* FastAPI
* Python

Data & AI

* Pandas
* Ollama (LLM for AI insights and chat)

Database

* MySQL

---

## How it works (simple flow)

1. User uploads dataset
2. Backend processes data using Pandas
3. APIs send processed data to frontend
4. Charts and dashboards are generated
5. AI module analyzes data and answers queries

---

## Project structure

### Frontend

ai-bi-frontend/
│── app/                 # App router (pages, layouts, routes)
│── components/          # Reusable UI components
│── context/             # React context (state management)
│── hooks/               # Custom React hooks
│── services/            # API calls and external services
│── styles/              # Global and component styles
│── utils/               # Helper functions
│── public/              # Static assets (images, icons)
│
│── package.json         # Project dependencies and scripts
│── package-lock.json    # Dependency lock file
│── next.config.js       # Next.js configuration
│── tailwind.config.js   # Tailwind CSS configuration
│── postcss.config.js    # PostCSS configuration
│── tsconfig.json        # TypeScript configuration
│── .gitignore           # Ignored files
│── README.md            # Project documentation

### Backend

ai-bi-backend/
ai-bi-backend/
│── app/
│   ├── core/            # Core settings and configurations
│   ├── database/        # Database connection and setup
│   ├── models/          # Database models
│   ├── routes/          # API route definitions
│   ├── schemas/         # Pydantic schemas
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│
│── uploads/             # Uploaded files (optional, usually ignored)
│── main.py              # Entry point of FastAPI app
│── requirements.txt     # Python dependencies
│── .env                 # Environment variables (not uploaded)
│── .gitignore           # Ignored files
│── README.md            # Project documentation
---

## Running locally

Clone the project

git clone https://github.com/yourusername/ai-bi-nexus.git

---

Frontend

cd ai-bi-frontend
npm install
npm run dev

---

Backend

cd ai-bi-backend
python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload

---

## Screenshots

(Add your images inside a screenshots folder)

Dashboard
![Dashboard](screenshots/dashboard.png)

Visualization
![Visualization](screenshots/visualization.png)

AI Chat
![AI Chat](screenshots/ai-chat.png)

Reports
![Reports](screenshots/reports.png)

---

## What I learned

* Building a complete full-stack system from scratch
* Structuring scalable backend APIs
* Connecting AI with real-world data
* Designing clean UI for data-heavy applications

---

## Future improvements

* Prediction models (machine learning)
* Real-time data updates
* Authentication system
* Deployment and scaling

---

## Author

Sudhakar Sudhanshu
MCA Student, Pune

---

## Note

This project is actively being improved and expanded.
