const Serie = require("../models/Serie");

exports.create = async (req, res) => {
    if (req.user.isAdmin) {
      const newSerie = new Serie(req.body);
      try {
        const savedSerie = await newSerie.save();
        res.status(201).json(savedSerie);
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
        const updatedSerie = await Serie.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedSerie);
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
        await Serie.findByIdAndDelete(req.params.id);
        res.status(200).json("The serie has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
}

exports.get = async (req, res) => {
    try {
      const serie = await Serie.findById(req.params.id).populate("genre");
      res.status(200).json(serie);
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.getRandom = async (req, res) => {
    try {
      const serie = await Serie.aggregate([
        { $sample: { size: 1 } },
      ]);
      res.status(200).json(serie);
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.getAll = async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const series = await Serie.find();
        res.status(200).json(series.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
}