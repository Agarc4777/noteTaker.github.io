//Dependencies including express for server side, path for working with file and directory paths, and fs for the file system 
const express = require("express");
const path = require("path");
const fs = require("fs");

//Opens up express and sets a port, modified for Heroku
var app = express();
var PORT = process.env.PORT || 3000
;

//Sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routes: HTML's
app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Routes: API's 
app.get("/api/notes", function (req, res){
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// app post. adds new note.
app.post("/api/notes", function (req, res){
    // function to read notes from db.json
    let newNote = req.body;
    var notes = [];
    fs.readFile('./db/db.json', (error, data) => {
        if (err) return "ERROR";
        notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => 
            err ? console.error(err) : console.log('successfully added.')
        );
        res.send(notes);
    });
});

// app delete
app.delete("/api/notes", function (req,res){
    var note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var delNoteID = req.params.id;
    note = note.filter(function (data){
        return data.id != delNoteID;
    });
    let deletedNotes = JSON.stringify(note);
    fs.writeFile("./db/db.json", deletedNotes, err =>{
        if (err) throw err;
        else {
            return res.json(deletedNotes);
        }
    });    
});

// moved this to end due to issues that might occur.
app.get("*", function (req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// console log for port number.
app.listen(PORT, function() {
    console.log("connected to port: " + PORT);
});