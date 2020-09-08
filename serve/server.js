"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var circle_1 = require("./circle");
// Create a new express app instance
var app = express();
app.get("/", function (req, res) {
    res.send(circle_1.area(29).toString());
});
app.listen(3000, function () {
    console.log("App is listening on port 3000!");
});
