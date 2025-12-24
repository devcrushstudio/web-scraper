# Ultra Web Scraper API 🚀

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![Axios](https://img.shields.io/badge/Axios-HTTP-orange)
![Cheerio](https://img.shields.io/badge/Cheerio-HTML%20Parser-yellow)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

## 🔍 Overview

**Ultra Web Scraper API** is a lightweight, fast, and production‑ready **Node.js web scraper** that works **without Puppeteer or headless browsers**.  
It is designed to scrape useful metadata and clean content from websites efficiently using Axios and Cheerio.

Perfect for SEO tools, content analysis, research automation, and backend services.

---

## ✨ Features

- Scrape **page title**, **meta description**
- Extract **canonical URL**
- Detect **language** and **charset**
- Extract **headings (H1–H6)**
- Extract **links and images** with absolute URLs
- Clean visible text content
- Generate **word count**
- Fast & lightweight (no Chromium)
- REST API ready for production

---

## 📦 Installation

```bash
git clone https://github.com/devcrushstudio/web-scraper.git
cd web-scraper
npm install
```

---

## ▶️ Usage

### Start the Server

```bash
npm start
```

Server runs on:

```
http://localhost:3000
```

---

## 🔗 API Endpoint

### Scrape a Website

```
GET /api/scrape?url=https://example.com
```

### Example Request

```http
GET http://localhost:3000/api/scrape?url=https://example.com
```

---

## 📄 Example JSON Response

```json
{
  "url": "https://example.com",
  "title": "Example Domain",
  "description": "This domain is for use in illustrative examples.",
  "canonical": "https://example.com",
  "language": "en",
  "charset": "utf-8",
  "headings": {
    "h1": ["Example Domain"],
    "h2": [],
    "h3": []
  },
  "links": [
    "https://www.iana.org/domains/example"
  ],
  "images": [],
  "wordCount": 158
}
```

---

## 🚀 Deployment

### Deploy on Vercel (Free Tier)

1. Push project to GitHub
2. Import repository into **Vercel**
3. Set:
   - Build Command: `npm install`
   - Output Directory: default
4. Deploy 🎉

### Deploy on Render (Free Tier)

1. Create **Web Service**
2. Connect GitHub repository
3. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Deploy 🚀

---

## 📁 Folder Structure

```
web-scraper/
│
├── index.js
├── routes/
│   └── scrape.js
├── package.json
├── README.md
└── node_modules/
```

---

## 📚 Dependencies

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [Axios](https://axios-http.com)
- [Cheerio](https://cheerio.js.org)

---

## ⚠️ Important Notes

- 🚫 **No Puppeteer / No Headless Browser**
- ⚡ Best for **static & server-rendered websites**
- ❌ JavaScript‑heavy SPA sites may not return dynamic content
- 🔒 Respect website **robots.txt** and legal terms

---

## 📜 License

This project is licensed under the **MIT License**.

---

### ⭐ Star the repo if you find it useful!
