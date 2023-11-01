const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const authRouter = express.Router();
authRouter.route("/signIn").post(urlencodedParser, (req, res) => {
  const { user_name, api_secret_key } = req.body;
  
  if (
    user_name == process.env.USER_NAME &&
    api_secret_key == process.env.OPENAI_SECRET_KEY
  ) {
    res.render("submitText");
  } else {
    console.log("wrong name or key");
    res.render("index");
  }
});

module.exports = authRouter;
