const Movie = require("../models/Movie");

exports.create = async (req, res) => {
    if (req.user.isAdmin) {
      const newMovie = new Movie(req.body);
      try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
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
        const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMovie);
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
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("The movie has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
}

exports.get = async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id).populate("genre");
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.getRandom = async (req, res) => {
    try {
      const movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.getAll = async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
}