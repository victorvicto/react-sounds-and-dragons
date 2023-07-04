const express = require("express");
var fs = require('fs');

const app = express();
var sound_lore = JSON.parse(fs.readFileSync('./Public/sound_lore.json', 'utf8'));

app.get('/', (req, res) => {
        res.send('Hello World!')
    });

app.get("/sound_lore", async (req, res) => {
	    res.send(sound_lore);
    });

app.post("/new", (req, res) => {
        var parent = sound_lore;
        for(var key of req.body.path){
            parent = parent[key];
        }
        if("final_key" in req.body){
            parent[req.body.final_key] = req.body.content;
        } else {
            parent.push(req.body.content);
        }
    });

app.delete("/old", (req, res) => {

    });

app.listen(5000, () => {console.log("Server has started!")});