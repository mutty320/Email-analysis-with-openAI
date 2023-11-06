const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));

const path = require("path");
const PORT = process.env.PORT || 3000;

const session = require('express-session');
app.use(session({
  secret: 'mysession',
  resave: false,
  saveUninitialized: true
}));

// Set the base path for views and routers
const baseViewsPath = path.join(__dirname, 'src', 'views');
const baseRoutersPath = path.join(__dirname, 'src', 'routers');

app.set('views', baseViewsPath);
app.set('view engine', 'ejs');

const authRouter = require("./src/routers/authRouter");
const analysisRouter = require(path.join(baseRoutersPath, 'analysisRouter'))

app.use("/analysis", analysisRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
