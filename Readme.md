# 🚀 BeyondChats – Full Stack Automation Assignment

**Role Applied:** Full Stack Developer Intern  
**Tech Focus:** Web Scraping • Backend APIs • Automation • AI Integration • React UI

---

## 👋 Overview (For Recruiters)

This project is a **production-style full stack automation system** built as part of a Full Stack Development internship assignment.

It demonstrates my ability to:
- Design clean backend APIs
- Scrape and process real-world web data
- Build reliable automation pipelines
- Integrate AI services responsibly (with fallbacks)
- Present data clearly using a modern React UI

The system **scrapes original blog articles**, enhances them using **external references and AI**, and displays **both original and updated versions** without overwriting data.

---

## 🧠 What This Project Does (High-Level)

1. Scrapes original blog articles from **BeyondChats**
2. Stores them in **MongoDB**
3. Searches Google for related high-ranking articles
4. Scrapes content from external sources
5. Uses an LLM to enhance the original article
6. Publishes a **new AI-updated article**
7. Displays both versions in a **React frontend**

---

## ✅ Key Engineering Highlights

- 🔍 **Web Scraping:** Axios + Cheerio
- 🧩 **REST APIs:** Node.js, Express, MongoDB
- 🔄 **Automation Pipeline:** Robust, error-tolerant design
- 🧠 **AI Integration:** LLM-based rewriting with graceful fallback
- 🧱 **Data Integrity:** Originals are never overwritten
- 🖥 **Frontend:** Clean, responsive React UI
- 🔐 **Security:** Environment variables, no secrets committed

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Automation / Scraping
- Axios
- Cheerio
- Google Search API
- OpenAI API (LLM)

---

## 📂 Project Structure

# 🚀 BeyondChats – Full Stack Automation Assignment

**Role Applied:** Full Stack Developer Intern  
**Tech Focus:** Web Scraping • Backend APIs • Automation • AI Integration • React UI

---

## 👋 Overview (For Recruiters)

This project is a **production-style full stack automation system** built as part of a Full Stack Development internship assignment.

It demonstrates my ability to:
- Design clean backend APIs
- Scrape and process real-world web data
- Build reliable automation pipelines
- Integrate AI services responsibly (with fallbacks)
- Present data clearly using a modern React UI

The system **scrapes original blog articles**, enhances them using **external references and AI**, and displays **both original and updated versions** without overwriting data.

---

## 🧠 What This Project Does (High-Level)

1. Scrapes original blog articles from **BeyondChats**
2. Stores them in **MongoDB**
3. Searches Google for related high-ranking articles
4. Scrapes content from external sources
5. Uses an LLM to enhance the original article
6. Publishes a **new AI-updated article**
7. Displays both versions in a **React frontend**

---

## ✅ Key Engineering Highlights

- 🔍 **Web Scraping:** Axios + Cheerio
- 🧩 **REST APIs:** Node.js, Express, MongoDB
- 🔄 **Automation Pipeline:** Robust, error-tolerant design
- 🧠 **AI Integration:** LLM-based rewriting with graceful fallback
- 🧱 **Data Integrity:** Originals are never overwritten
- 🖥 **Frontend:** Clean, responsive React UI
- 🔐 **Security:** Environment variables, no secrets committed

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Automation / Scraping
- Axios
- Cheerio
- Google Search API
- OpenAI API (LLM)

---

## 📂 Project Structure

├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── models/
│ │ └── services/
│ └── server.js
│
├── automation/
│ ├── index.js
│ ├── googleSearch.js
│ ├── scrapeArticle.js
│ └── rewriteWithLLM.js
│
├── frontend/
│ └── src/
│
└── README.md


---

## 🗄️ Database Design

### Original Article
```json
{
  "title": "Article Title",
  "content": "Scraped content",
  "isOriginal": true,
  "isUpdated": false
}
```

---

## 🗄️ Database Design

### Original Article
```json
{
  "title": "Article Title",
  "content": "Scraped content",
  "isOriginal": true,
  "isUpdated": false
}
```

### AI-Updated Arcticle
```json
{
  "title": "Article Title",
  "content": "AI-enhanced content",
  "references": ["external_link_1", "external_link_2"],
  "isOriginal": false,
  "isUpdated": true,
  "originalArticleId": "ObjectId"
}
```

## ▶️ How to Run the Project

### 1️⃣ Backend
```bash
cd backend
npm install
npm start
```

### 2️⃣ Scrape Original Articles
```bash
curl -X POST http://localhost:5000/api/articles/scrape
```

### 3️⃣ Run Automation
```bash
cd automation
node index.js
```

### 4️⃣ Frontend
```bash
cd frontend
npm install
npm start
```

### 🔐 Environment Variables
Create .env files locally (not committed).

Backend .env
```bash
MONGO_URI=mongodb://127.0.0.1:27017/beyondchats
PORT=5000
```

Automation .env
```bash
API_BASE_URL=http://localhost:5000/api/articles
OPENAI_API_KEY=your_openai_key
SERP_API_KEY=your_google_search_key
```



