const axios = require("axios");
const cheerio = require("cheerio");
const { URL } = require("url");

// Helper: make absolute URLs
function makeAbsolute(base, link) {
  try {
    return new URL(link, base).href;
  } catch {
    return null;
  }
}

module.exports = async function scrape(url) {
  try {
    const res = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 15000,
    });

    const $ = cheerio.load(res.data);

    // Clean text
    const text = $("body")
      .clone()
      .find("script,style,noscript")
      .remove()
      .end()
      .text()
      .replace(/\s+/g, " ")
      .trim();

    // Return scraped data
    return {
      method: "fast",
      url,
      title: $("title").text() || "",
      description: $('meta[name="description"]').attr("content") || "",
      canonical: $('link[rel="canonical"]').attr("href") || "",
      language: $("html").attr("lang") || "",
      charset: $('meta[charset]').attr("charset") || "",
      headings: {
        h1: $("h1").map((i, e) => $(e).text()).get(),
        h2: $("h2").map((i, e) => $(e).text()).get(),
        h3: $("h3").map((i, e) => $(e).text()).get(),
        h4: $("h4").map((i, e) => $(e).text()).get(),
        h5: $("h5").map((i, e) => $(e).text()).get(),
        h6: $("h6").map((i, e) => $(e).text()).get(),
      },
      images: $("img")
        .map((i, e) => makeAbsolute(url, $(e).attr("src")))
        .get()
        .filter(Boolean),
      links: $("a")
        .map((i, e) => makeAbsolute(url, $(e).attr("href")))
        .get()
        .filter(Boolean),
      text,
      wordCount: text.split(" ").length,
    };
  } catch (err) {
    throw new Error("Scraping failed: " + err.message);
  }
};
