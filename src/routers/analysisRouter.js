const express = require("express");
const axios = require("axios");
const analysisRouter = express.Router();
const path = require("path");
//=================================================================
const openaiEndpoint = "https://api.openai.com/v1/completions";

const {
  headers,
  summarize_prompt,
  sentiment_prompt,
  await_prompt,
  summarize_tokens,
  sentiment_tokens,
  awaitingResponse_tokens,
} = require(path.join(__dirname, "..", "utilities", "constants"));

async function connectApi(emailText, prompt, max_tokens) {
  try {
    const response = await axios.post(
      openaiEndpoint,
      {
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt + emailText,
        max_tokens: max_tokens,
      },
      {
        headers,
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(
      "Error analyzing sentiment:",
      error.response.status,
      error.response.data
    );
    return "error";
  }
}

analysisRouter.use((req, res, next) => {
  if (req.session.authHeader == process.env.OPENAI_SECRET_KEY) {
    next();
  } else {
    res.render("index", { error: { message: " Please sign in first" } });
  }
});

analysisRouter.route("/").post(async (req, res) => {
  try {
    const emailText = req.body.textinput;

    const summary = await connectApi(
      emailText,
      summarize_prompt,
      summarize_tokens
    );

    const sentiment = await connectApi(
      emailText,
      sentiment_prompt,
      sentiment_tokens
    );

    const awaitingResponse = await connectApi(
      emailText,
      await_prompt,
      awaitingResponse_tokens
    );

    const analysis = { summary, sentiment, awaitingResponse };
    res.render("analysis", { analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = analysisRouter;
