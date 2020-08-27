require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var morgan = require("morgan");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use("/api/payment", require("./routes/payments"));
app.use("/api/webhooks", require("./routes/webhook"));
app.use("/api/redirects", require("./routes/redirects"));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/detail", function (req, res) {
  res.render("detail", req.query);
});

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

app.listen(PORT, () => console.log(`\n Server start in port: ${PORT} \n`));
