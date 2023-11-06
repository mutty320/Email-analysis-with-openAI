const express = require("express");
require("dotenv").config();

error = null
const authRouter = express.Router();
authRouter.route("/signIn").post((req, res) => {
  const { user_name, api_secret_key } = req.body;

  if (
    user_name == process.env.USER_NAME &&
    api_secret_key == process.env.OPENAI_SECRET_KEY
  ) {
    req.session.authHeader = api_secret_key
    res.render("submitText");
  } else {
      error = {
      message:
        "Unauthorized, you provided Incorrect username or Incorrect key",
    };

    res.render("index", { error });
  }
});

module.exports = authRouter;
