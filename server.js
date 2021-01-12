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

app.get("*", function (req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Routes: API's 
app.get("/api/notes", function (req, res){
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


// app post. adds new note.
app.post("/api/notes", function (req, res){
// function to read notes from db.json
    let newNote = req.body;
    newNote.id = idNumber(),
    newNote.push(newNote);
});

// app delete
app.delete("/api/notes", function (req, res){
    // function to delete notes from the db.


})


// console log for port number.