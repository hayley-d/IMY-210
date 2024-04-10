/*Hayley Dodkins u21528790*/
const express = require ('express');
const app = express();
const PORT  = 3000;

app.use(express.json());

const xml = require('xml-js');
const fs = require('fs');
const crypto = require('crypto');

//GET all notes
//Tested
app.get('/notes',(req,res)=>{
    fs.readFile('./data/notes.xml','utf8',(err,data)=>{
        if(err){
            console.error(err);
            res.send(500).json({error:'Internal Server Error'});
            return;
        }

        const xmlData = xml.xml2js(data, {compact:true});
        const notes = xmlData.notes.note.map(note=>({
            id:note._attributes.id,
            author:note.author._text,
            content:note.content._text
        }));

        res.json(notes);
    });
});

//Tested
app.get('/notes/:user',(req,res)=>{
    const user = req.params.user;

    fs.readFile('./data/notes.xml','utf8',(err,data)=>{
        if(err){
            console.error(err);
            res.send(500).json({error:'Internal Server Error'});
            return;
        }

        const xmlData = xml.xml2js(data, {compact:true});

        const notes = xmlData.notes.note.filter(note=>note.author._text === user).map(note=>({
            id:note._attributes.id,
            author:note.author._text,
            content:note.content._text
        }));
        res.json(notes);
    });
});

//Tested
app.post('/addNote',(req,res)=>{
    const newNote = req.body;
    console.log(newNote)

    //check if the new note contains the content
    if(!newNote || !newNote.author || !newNote.content)
    {
        res.status(400).json({error:'Missing author or content in the request body.'});
        return;
    }

    //generate the ID based on the md5 hash of the content
    const contentHash = crypto.createHash('md5').update(newNote.content).digest('hex');

    fs.readFile('./data/notes.xml','utf8',(err,data)=>{
        if(err){
            console.error(err);
            res.send(500).json({error:'Internal Server Error'});
            return;
        }

        const xmlData = xml.xml2js(data, {compact:true});
        const newId = contentHash;

        const note = {
            _attributes:{id:newId},
            author:newNote.author,
            content:newNote.content
        }

        xmlData.notes.note.push(note);

        const updatedXml = xml.js2xml(xmlData,{compact:true, spaces:4});

        fs.writeFile('./data/notes.xml',updatedXml,(err)=>{
            if(err){
                console.error(err);
                res.send(500).json({error:'Internal Server Error'});
                return;
            }

            res.json({message:'Note Successfully Added',note:{id:newId,...newNote}})
        });
    });
});

//Tested
app.delete('/delete/:noteId',(req,res)=>{
    const noteId = req.params.noteId;

    fs.readFile('./data/notes.xml','utf8',(err,data)=>{
        if(err){
            console.error(err);
            res.send(500).json({error:'Internal Server Error'});
            return;
        }

        const xmlData = xml.xml2js(data, {compact:true});
        const index = xmlData.notes.note.findIndex(note=>note._attributes.id === noteId);

        if(index === -1)
        {
            res.status(404).json({error:'Note not found.'});
            return;
        }

        xmlData.notes.note.splice(index,1);

        const updatedXml = xml.js2xml(xmlData,{compact:true, spaces:4});

        fs.writeFile('./data/notes.xml',updatedXml,(err)=>{
            if(err){
                console.error(err);
                res.send(500).json({error:'Internal Server Error'});
                return;
            }
            res.json({message:'Note successfully deleted.'});
        });
    });
});

app.patch('/update/:noteId',(req,res)=>{
    const noteId = req.params.noteId;
    const {author,content} = req.body;

    fs.readFile('./data/notes.xml','utf8',(err,data)=>{
        if(err){
            console.error(err);
            res.send(500).json({error:'Internal Server Error'});
            return;
        }

        const xmlData = xml.xml2js(data, {compact:true});
        const note = xmlData.notes.note.find(note=>note._attributes.id === noteId);

        if(!note){
            res.status(404).json({error:'Note not found.'});
            return;
        }

        if(author)
        {
            note.author._text = author;
        }

        if(content)
        {
            note.content._text = content;
        }

        const updatedXml = xml.js2xml(xmlData,{compact:true, spaces:4});
        fs.writeFile('./data/notes.xml',updatedXml,(err)=>{
            if(err){
                console.error(err);
                res.send(500).json({error:'Internal Server Error'});
                return;
            }
            res.json({message:'Note successfully updated',note:{id:noteId, author,content}})
        });
    });
});




app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})