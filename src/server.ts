import express = require("express");
import { area } from "./circle";

// Create a new express app instance
const app: express.Application = express();
app.get("/", function (req, res) {
    res.send(area(29).toString());
});
app.listen(3000, function () {
    console.log("App is listening on port 3000!");
});