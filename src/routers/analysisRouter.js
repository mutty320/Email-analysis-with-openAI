const express = require("express");
const axios = require("axios");
const analysisRouter = express.Router();
const path = require("path");
//------------------------------
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//=================================================================
const openaiEndpoint = "https://api.openai.com/v1/completions"
 // "https://api.openai.com/v1/engines/text-davinci-003/completions";

const {
  headers,
  summarize_prompt,
  sentiment_prompt,
  await_prompt,
  summarize_tokens,
  sentiment_tokens,
  awaitingResponse_tokens
}  = require(path.join(__dirname, '..', 'utilities', 'constants'));

async function connectApi(emailText, prompt, max_tokens) {
  try {
    const response = await axios.post(
      openaiEndpoint,
      {
        model: "text-davinci-003",
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

analysisRouter.route("/").post(urlencodedParser, async (req, res) => {
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