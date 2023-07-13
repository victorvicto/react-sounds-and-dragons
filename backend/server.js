const express = require("express");
const cors = require("cors");
var fs = require('fs');

const app = express();
var sound_lore = JSON.parse(fs.readFileSync('./sound_lore.json', 'utf8'));

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/', (req, res) => {
        res.send('Hello World!')
    });

app.get("/sound_lore", async (req, res) => {
	    res.json(sound_lore);
    });

app.use('/files', express.static('public'))

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