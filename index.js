const express = require("express");
const cors = require("cors");
const scrape = require("./ultraScraper");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Ultra Powerful Scraper API Running" });
});

app.get("/api/scrape", async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).json({ success: false, message: "URL required" });

  try {
    const data = await scrape(url);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Scraping failed", error: err.message });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
