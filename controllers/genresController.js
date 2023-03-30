const Genre = require("../models/Genre");

exports.create = async (req, res) => {
    if (req.user.isAdmin) {
      const newGenre = new Genre(req.body);
      try {
        const savedGenre = await newGenre.save();
        res.status(201).json(savedGenre);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
}

exports.update = async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatedGenre = await Genre.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedGenre);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
}

exports.delete = async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Genre.findByIdAndDelete(req.params.id);
        res.status(200).json("The genre has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
}

exports.getAll = async (req, res) => {
      try {
        const genres = await Genre.find();
        res.status(200).json(genres.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
}