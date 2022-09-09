const { Router } = require('express');
const router = Router();
const path = require('path');
const { unlink } = require('fs-extra');


const Chord = require('../models/Chords');

router.get("/", async (req, res) => {
    const chords = await Chord.find();
    res.json(chords);
});

router.post("/", async (req, res) => {
    const { title, author, year }= req.body;
    const imagePath = "/uploads/"+ req.file.filename;
    const newChord= new Chord({title, author, year, imagePath});
    await newChord.save();
    res.json({message: 'Chord Saved'});
});

router.delete("/:id", async (req, res) => {
    const chord = await Chord.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public' + chord.imagePath)) 
    res.json({message: 'Chord Deleted'});
});

module.exports = router;