// setup a simple server to serve files out the docs folder
var express = require('express');
var app = express();
var path = require("path");

const build_folder = path.resolve(__dirname, '../docs')
const doc_folder = path.join(build_folder, 'docs')

app.get("/", (req, res) => {
    res.redirect("/docs/"); // this simulates being at a different address at github
});
app.get("/docs/", (req, res) => {
    // We should have an index html because of the pre-render plugin, but let's go to app by default
    res.sendFile(path.join(build_folder, "app.html"));
});
app.get("/docs/docs/", (req, res) => {
    res.sendFile(path.join(doc_folder, "index.html"));
});
app.use("/docs", express.static(build_folder));
app.use("/docs/docs", express.static(doc_folder));

app.listen(3000);
console.log("Server has started. Press ctrl+c to stop it.")