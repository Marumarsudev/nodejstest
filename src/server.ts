import path = require("path");
import fs = require("fs");
import http = require("http");
import express = require("express");
import bodyParser = require("body-parser");

const port: number = 3000;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("handle", (req, res) => {
    console.log(req.body);
});

router.get("/", (req, res) => {
    res.sendfile("index.html");
});

app.use("/public", router);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

// const server = http.createServer((req, res) => {
//     console.log(req.url);
//     console.log(path.extname(req.url as string));
//     if (path.extname(req.url as string) !== ".html" || req.method as string !== "GET") {
//         fourOuFour(res);
//     } else {
//         const newPath = path.join(__dirname + "/public" + req.url as string);
//         console.log(newPath);
//         fs.exists(newPath, (exists) => {
//             if (exists) {
//                 fs.createReadStream(newPath).pipe(res);
//             } else {
//                 fourOuFour(res);
//             }
//         });
//     }
// });

// server.listen(port, () => {
//     console.log(`App is listening on port ${port.toString()}!`);
// });

// const fourOuFour = (res:  http.ServerResponse) => {
//     res.statusCode = 404;
//     res.end("<title>OnO 404!!!</title>OwO!!! Sowwy wequested page not found!");
// };