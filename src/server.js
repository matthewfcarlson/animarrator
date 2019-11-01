// setup a simple server to serve files out the docs folder
var express = require('express');
var app = express();
var path = require("path");

const doc_folder = path.resolve(__dirname, '../docs')

app.get("/", (req, res) => {
    res.redirect("/docs/")
});
app.get("/docs/", (req, res) => {
    res.sendFile(path.join(doc_folder, "app.html"));
});
app.use("/docs", express.static('../docs'));

app.listen(3000);
console.log("Server has started. Press ctrl+c to stop it.")