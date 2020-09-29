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

app.all("/messages", (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
});

app.get('/messages', (req, res, next) => {
    res.end("<html><head><title>Message Board</title></head><body><h1>List of Messages</h1><p>The list should be here...</p></body></html>");
});

app.get('/messages/:msgId', (req, res, next) => {
    const data = JSON.parse(fs.readFileSync("serve/data.json").toString());
    if (data[req.params.msgId] != null) {
        const resData = data[req.params.msgId];
        res.end(`<html><head><title>Message Board</title></head><body><h1>List of Messages</h1><h2>${resData.messagetitle}</h2><p>${resData.messagecontent}</p></body></html>`);
    } else
    {
        res.end(`<html><head><title>Message Board</title></head><body><h1>List of Messages</h1><p>No messages found with id:${req.params.msgId}</p></body></html>`);
    }
});

app.post('/messages', (req, res, next) => {
    res.end('<html><head><title>Message Board</title></head><body><h3>Adding message:</h3><p>Message content:<br/>Title:'
    + req.body.messagetitle + '<br />Content:' + req.body.messagecontent +'</p></body></html>');
    const data = JSON.parse(fs.readFileSync("serve/data.json").toString());
    data.push({messagetitle:req.body.messagetitle, messagecontent:req.body.messagecontent});
    console.log(data);
    fs.writeFileSync("serve/data.json", JSON.stringify(data));
});

app.put('/messages/:msgId', (req, res, next) => {
    const data = JSON.parse(fs.readFileSync("serve/data.json").toString());
    if (data[req.params.msgId] != null) {
        res.end(`<html><head><title>Message Board</title></head><body><h3>Editing message id: ${req.params.msgId}</h3></body></html>`);
        data[req.params.msgId].messagetitle = req.body.messagetitle;
        data[req.params.msgId].messagecontent = req.body.messagecontent;
    } else
    {
        res.end(`<html><head><title>Message Board</title></head><body><h3>No message with id: ${req.params.msgId}</h3></body></html>`);
    }
    console.log(data);
    fs.writeFileSync("serve/data.json", JSON.stringify(data));
});

app.delete('/messages/:msgId', (req, res, next) => {
    const data = JSON.parse(fs.readFileSync("serve/data.json").toString());
    if (data[req.params.msgId] != null) {
        res.end(`<html><head><title>Message Board</title></head><body><h3>Deleting message id: ${req.params.msgId}</h3></body></html>`);
        data[req.params.msgId] = null;
    } else
    {
        res.end(`<html><head><title>Message Board</title></head><body><h3>No message with id: ${req.params.msgId}</h3></body></html>`);
    }
    console.log(data);
    fs.writeFileSync("serve/data.json", JSON.stringify(data));
});

app.listen(port, () => {
    fs.exists("/messages/data.json", (exists) => {
        if (!exists) {
            console.log("creating data.json");
            const data:any = [];
            fs.writeFileSync("serve/data.json", JSON.stringify(data));
        } else {
            console.log("file exists");
        }
    });
    console.log(`App is listening on port ${port}`);
});