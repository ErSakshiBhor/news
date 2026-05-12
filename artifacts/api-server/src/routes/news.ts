import { Router } from "express";

const newsRouter = Router();

newsRouter.get("/news", async (req, res) => {
  const { country = "us", category = "general", page = "1", pageSize = "10" } = req.query as Record<string, string>;

  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "NEWS_API_KEY is not configured. Please set this environment variable." });
    return;
  }

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    const data = await response.json() as Record<string, unknown>;

    if (!response.ok) {
      res.status(response.status).json(data);
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch news");
    res.status(500).json({ error: "Failed to fetch news from NewsAPI" });
  }
});

export default newsRouter;
