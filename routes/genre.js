const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const { Genre, validateGenre } = require('../models/genres');

// const movieGenre = [
// 	{ id:1, genre: 'Action' },
// 	{id: 2, genre: 'Comedy' },
// 	{ id:3, genre: 'Horror' }
// 	]

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send("Genre Must be atleast 3 characters");
    return;
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  // const updatedGenre = movieGenre.find(c => c.id ===  parseInt(req.params.id));
  if (!genre) {
    res.send(404).send("Bad Request");
    return;
  }

  // updatedGenre.genre = req.body.genre;
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  // const deleteGenre = movieGenre.find(c => c.id ===  parseInt(req.params.id));
  if (!genre) {
    res.send(400).send("Bad Request");
    return;
  }

  //const index = movieGenre.indexOf(deleteGenre);
  // movieGenre.splice(index, 1);
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.send(400).send("Bad Request");

  res.send(genre);
});

module.exports = router;
