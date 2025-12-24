# 🕸️ Web Scraper API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Cheerio](https://img.shields.io/badge/Cheerio-e88c1f?style=for-the-badge&logo=cheerio&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**An ultra-powerful, Puppeteer-free web scraper API built for speed and efficiency.**

This project extracts structured data from websites using static HTML parsing. Because it utilizes `Axios` and `Cheerio` instead of a headless browser (like Puppeteer or Selenium), it is lightweight, extremely fast, and ideal for serverless deployments.

---

## 🚀 Features

-   **Comprehensive Metadata:** Extracts Title, Description, Canonical URL, Language, and Charset.
-   **Structured Content:** Scrapes headings (`h1`–`h6`) to understand content hierarchy.
-   **Asset Extraction:** Captures all links and images, automatically converting relative paths to **absolute URLs**.
-   **Text Analysis:** Provides clean, stripped text content and an accurate word count.
-   **Performance:** Lightweight and production-ready; runs smoothly on low-resource environments (Free tier hosting).
-   **CORS Enabled:** Ready for frontend integration.

---

## 🛠️ Installation

### Prerequisites
-   [Node.js](https://nodejs.org/) (v14 or higher)
-   npm or yarn

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/devcrushstudio/web-scraper.git
    cd web-scraper
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    # Development mode
    npm run dev

    # Production start
    npm start
    ```
    The server will start on port `3000` by default.

---

## 🔌 API Usage

### Endpoint
`GET /api/scrape`

### Query Parameters
| Parameter | Type   | Required | Description |
| :-------- | :----- | :------- | :---------- |
| `url`     | string | **Yes**  | The target website URL (must include http/https) |

### Example Request
You can test the API using a browser, cURL, or Postman.

**Browser:**
http://localhost:3000/api/scrape?url=https://example.com
code
Code
**cURL:**
```bash
curl "http://localhost:3000/api/scrape?url=https://example.com"
Example JSON Response
code
JSON
{
  "success": true,
  "data": {
    "metadata": {
      "title": "Example Domain",
      "description": "",
      "canonical": "https://example.com/",
      "lang": "en",
      "charset": "utf-8"
    },
    "content": {
      "headings": {
        "h1": ["Example Domain"],
        "h2": [],
        "h3": []
      },
      "wordCount": 125,
      "text": "Example Domain This domain is for use in illustrative examples in documents..."
    },
    "links": [
      {
        "text": "More information...",
        "href": "https://www.iana.org/domains/example"
      }
    ],
    "images": [
      {
        "alt": "Logo",
        "src": "https://example.com/images/logo.png"
      }
    ]
  }
}
📂 Folder Structure
code
Code
web-scraper/
├── src/
│   ├── controllers/      # Request logic
│   ├── routes/           # API Routes
│   ├── services/         # Scraping logic (Cheerio implementation)
│   └── utils/            # Helper functions (URL normalization)
├── index.js              # Entry point
├── package.json          # Dependencies
└── README.md             # Documentation
📦 Dependencies
Package	Description	Link
Express	Fast, unopinionated web framework for Node.js	npm
Axios	Promise-based HTTP client for fetching HTML	npm
Cheerio	Fast, flexible implementation of core jQuery for parsing HTML	npm
Cors	Middleware to enable Cross-Origin Resource Sharing	npm
🌍 Deployment
Since this scraper does not require a browser installation (Chromium/Puppeteer), it can be deployed easily on free-tier hosting platforms.
Option 1: Vercel (Recommended)
Install Vercel CLI or use the Vercel Dashboard.
Add a vercel.json file (if not present) to redirect traffic to Express:
code
JSON
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
Deploy:
code
Bash
vercel
Option 2: Render
Create a new Web Service on Render.
Connect your GitHub repository.
Use the following settings:
Runtime: Node
Build Command: npm install
Start Command: node index.js
Click Create Web Service.
⚠️ Important Notes
Static vs. Dynamic Sites
This scraper uses Cheerio, which parses static HTML returned by the server.
✅ Works great for: Blogs, documentation, news sites, and server-side rendered (SSR) pages.
❌ Limitations: It cannot execute JavaScript. If a website uses React/Vue/Angular (Single Page Applications) to load content after the initial page load, this scraper might return empty data. For those cases, you would need a Puppeteer-based solution.
Respect robots.txt
Please ensure you use this tool responsibly and respect the target website's robots.txt policies and Terms of Service.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
<p align="center">
Built with ❤️ by <a href="https://github.com/devcrushstudio">DevCrush Studio</a>
</p>
