const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
const { URL } = require("url");

// Helper: make absolute links
function makeAbsolute(base, link) {
  try { return new URL(link, base).href; } catch { return null; }
}

// Fast scraper with Axios + Cheerio
async function fastScrape(url) {
  const res = await axios.get(url, { headers: { "User-Agent": "Mozilla/5.0" }, timeout: 15000 });
  const $ = cheerio.load(res.data);

  const cleanText = $("body").clone().find("script,style,noscript").remove().end().text().replace(/\s+/g, " ").trim();

  return {
    method: "fast",
    title: $("title").text(),
    description: $('meta[name="description"]').attr("content") || "",
    canonical: $('link[rel="canonical"]').attr("href") || "",
    language: $("html").attr("lang") || "",
    charset: $('meta[charset]').attr("charset") || "",
    og: {
      title: $('meta[property="og:title"]').attr("content") || "",
      description: $('meta[property="og:description"]').attr("content") || "",
      image: $('meta[property="og:image"]').attr("content") || ""
    },
    headings: {
      h1: $("h1").map((i,e)=>$(e).text()).get(),
      h2: $("h2").map((i,e)=>$(e).text()).get(),
      h3: $("h3").map((i,e)=>$(e).text()).get(),
      h4: $("h4").map((i,e)=>$(e).text()).get(),
      h5: $("h5").map((i,e)=>$(e).text()).get(),
      h6: $("h6").map((i,e)=>$(e).text()).get(),
    },
    images: $("img").map((i,e)=>makeAbsolute(url, $(e).attr("src"))).get().filter(Boolean),
    links: $("a").map((i,e)=>makeAbsolute(url, $(e).attr("href"))).get().filter(Boolean),
    text: cleanText,
    wordCount: cleanText.split(" ").length
  };
}

// JS rendered scraper using Puppeteer
async function jsScrape(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0");
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  const data = await page.evaluate(() => {
    const cleanText = document.body.innerText.replace(/\s+/g," ").trim();
    const getMeta = name => document.querySelector(`meta[name="${name}"]`)?.content || "";
    const getOG = prop => document.querySelector(`meta[property="${prop}"]`)?.content || "";

    return {
      title: document.title,
      description: getMeta("description"),
      canonical: document.querySelector('link[rel="canonical"]')?.href || "",
      language: document.documentElement.lang || "",
      charset: document.characterSet || "",
      og: {
        title: getOG("og:title"),
        description: getOG("og:description"),
        image: getOG("og:image")
      },
      headings: {
        h1: [...document.querySelectorAll("h1")].map(h=>h.innerText),
        h2: [...document.querySelectorAll("h2")].map(h=>h.innerText),
        h3: [...document.querySelectorAll("h3")].map(h=>h.innerText),
        h4: [...document.querySelectorAll("h4")].map(h=>h.innerText),
        h5: [...document.querySelectorAll("h5")].map(h=>h.innerText),
        h6: [...document.querySelectorAll("h6")].map(h=>h.innerText)
      },
      images: [...document.images].map(img=>img.src),
      links: [...document.links].map(a=>a.href),
      text: cleanText,
      wordCount: cleanText.split(" ").length
    };
  });

  await browser.close();
  return { method: "js-rendered", ...data };
}

// Main scraper function
module.exports = async function scrape(url) {
  try {
    const data = await fastScrape(url);
    if (!data.text || data.wordCount < 50) throw new Error("Fallback to JS Scraper");
    return data;
  } catch {
    return await jsScrape(url);
  }
};
