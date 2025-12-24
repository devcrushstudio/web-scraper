# Ultra Web Scraper API (Puppeteer-Free)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green) ![Express](https://img.shields.io/badge/Express-5.x-blue) ![Axios](https://img.shields.io/badge/Axios-1.x-yellow) ![Cheerio](https://img.shields.io/badge/Cheerio-1.x-orange)

A **fast and ultra-powerful web scraping API** built with Node.js, Express, Axios, and Cheerio — **no Puppeteer required**.  
Fetches titles, descriptions, headings, links, images, and clean text from any static website. Fully compatible with **Vercel** and **Render** free-tier deployments.

---

## 🔹 Features

- ✅ Fetch HTML content without Puppeteer  
- ✅ Scrape page title, meta description, canonical URL, language, charset  
- ✅ Extract headings (h1–h6), links, images  
- ✅ Clean text extraction with word count  
- ✅ Absolute URLs for links and images  
- ✅ Lightweight & fast (works on Vercel / Render free tier)  
- ✅ Production-ready API with JSON output  

---

## 🔹 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/web-scraper.git
cd web-scraper
Install dependencies:

bash
Copy code
npm install
🔹 Usage
Run locally:

bash
Copy code
node index.js
By default, the API runs on http://localhost:3000.

API Endpoint
bash
Copy code
GET /api/scrape?url=<website_url>
Example:

bash
Copy code
curl "http://localhost:3000/api/scrape?url=https://example.com"
Response:

json
Copy code
{
  "success": true,
  "data": {
    "method": "fast",
    "url": "https://example.com",
    "title": "Example Domain",
    "description": "",
    "canonical": "https://example.com/",
    "language": "en",
    "charset": "UTF-8",
    "headings": {
      "h1": ["Example Domain"],
      "h2": [],
      "h3": [],
      "h4": [],
      "h5": [],
      "h6": []
    },
    "images": [],
    "links": ["https://www.iana.org/domains/example"],
    "text": "Example Domain This domain is for use in illustrative examples in documents...",
    "wordCount": 19
  }
}
🔹 Deployment
Vercel
bash
Copy code
vercel
Build Command → leave empty
Output Directory → leave empty
Render
Build Command → npm install
Start Command → node index.js

Port handling in code:

js
Copy code
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
🔹 Folder Structure
bash
Copy code
web-scraper/
│
├── index.js         # Main Express API
├── ultraScraper.js  # Scraper module
├── package.json
└── README.md
🔹 Dependencies
Node.js

Express

Axios

Cheerio

CORS

🔹 Notes
This scraper works best for static websites.
JS-heavy sites (React, Next.js, Vue) will not be fully scraped without Puppeteer.
Lightweight, fast, and free-tier deploy ready.

