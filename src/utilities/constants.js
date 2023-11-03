
require("dotenv").config();


const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`,
  };
  //=========================================================
  const summarize_prompt = "Summarize the following email: ";
  const sentiment_prompt =
    "what is the sentiment of the following email please respond with one of the following: positive, negative, or neutral: ";
  const await_prompt =
    "please respond with true or false if the sender of the following email is expecting a response ";
  //===============================
  const summarize_tokens = 40;
  const sentiment_tokens = 10;
  const awaitingResponse_tokens = 10;
  //=================================

  module.exports = {
    headers,
    summarize_prompt,
    sentiment_prompt,
    await_prompt,
    summarize_tokens,
    sentiment_tokens,
    awaitingResponse_tokens
  };
