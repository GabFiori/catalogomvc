const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); 
const routes = require("./routes/routes");

const app = express();

app.set("views", path.join(__dirname, "views")); 


app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

module.exports = app;
