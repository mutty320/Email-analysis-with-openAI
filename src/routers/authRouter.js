const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
error = null
const authRouter = express.Router();
authRouter.route("/signIn").post(urlencodedParser, (req, res) => {
  const { user_name, api_secret_key } = req.body;

  if (
    user_name == process.env.USER_NAME &&
    api_secret_key == process.env.OPENAI_SECRET_KEY
  ) {
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
