import express = require("express");
import path = require("path");
import fs = require("fs");
import { area } from "./circle";

const port: number = 3000;

// Create a new express app instance
const app: express.Application = express();

app.get("*", (req, res) => {
    console.log(req.path);
    console.log(path.extname(req.path));
    if (path.extname(req.path) !== ".html") {
        fourOuFour(res);
    } else {
        const newPath = path.join(__dirname + "/public" + req.path);
        console.log(newPath);
        fs.exists(newPath, (exists) => {
            if (exists) {
                res.sendFile(newPath);
            } else {
                fourOuFour(res);
            }
        });
    }
});

const fourOuFour = (res:  express.Response) => {
    res.status(404).send("<title>OnO 404!!!</title>OwO!!! Sowwy wequested page not found!");
};

app.listen(port, () => {
    console.log(`App is listening on port ${port.toString()}!`);
});