// setup a simple server to serve files out the docs folder
var express = require('express');
var app = express();
var path = require("path");

const build_folder = path.resolve(__dirname, '../docs')
const doc_folder = path.join(build_folder, 'docs')

app.get("/", (req, res) => {
    res.redirect("/docs/")
});
app.get("/docs/", (req, res) => {
    res.sendFile(path.join(build_folder, "app.html"));
});
app.get("/docs/docs/", (req, res) => {
    res.sendFile(path.join(doc_folder, "index.html"));
});
app.use("/docs", express.static(build_folder));
app.use("/docs/docs", express.static(doc_folder));

app.listen(3000);
console.log("Server has started. Press ctrl+c to stop it.")