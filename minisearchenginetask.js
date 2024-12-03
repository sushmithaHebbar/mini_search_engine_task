const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8500;

app.use(cors());
app.use(bodyParser.json());

let articles = [];
let articleIndex = {};

const updateIndex = (id, title, content, tags) => {
  const words = [...title.split(/\s+/), ...content.split(/\s+/), ...tags];
  words.forEach((word) => {
    const key = word.toLowerCase();
    if (!articleIndex[key]) articleIndex[key] = new Set();
    articleIndex[key].add(id);
  });
};

app.post("/articles", (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const id = articles.length + 1;
  const newArticle = { id, title, content, tags, date: new Date() };
  articles.push(newArticle);

  updateIndex(id, title, content, tags);

  res.status(201).json({ message: "Article added successfully", article: newArticle });
});


app.post("/articles/bulk", (req, res) => {
  const articlesData = req.body;

  if (!Array.isArray(articlesData) || articlesData.length === 0) {
    return res.status(400).json({ error: "Array of articles is required" });
  }

  const newArticles = [];

  articlesData.forEach((articleData) => {
    const { title, content, tags } = articleData;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required for each article" });
    }

    const id = articles.length + 1;
    const newArticle = { id, title, content, tags, date: new Date() };
    articles.push(newArticle);

    updateIndex(id, title, content, tags);
    newArticles.push(newArticle);
  });

  res.status(201).json({ message: `${newArticles.length} articles added successfully`, articles: newArticles });
});

app.get("/articles/search", (req, res) => {
  const { keyword, sort = "relevance" } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  const keywordLower = keyword.toLowerCase();
  const matchedIds = articleIndex[keywordLower] || new Set();

  let results = Array.from(matchedIds).map((id) => articles.find((article) => article.id === id));

  if (sort === "relevance") {
    results = results.sort((a, b) => {
      const aFrequency = (a.title + " " + a.content).toLowerCase().split(keywordLower).length - 1;
      const bFrequency = (b.title + " " + b.content).toLowerCase().split(keywordLower).length - 1;
      return bFrequency - aFrequency; 
    });
  } else if (sort === "date") {
    results = results.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  res.json({ results });
});

app.get("/articles/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const article = articles.find((article) => article.id === id);

  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }

  res.json({ article });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
