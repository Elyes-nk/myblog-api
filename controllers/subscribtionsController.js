const Subscribtion = require("../models/Subscribtion");

exports.create = async (req, res) => {
    if (req.user.isAdmin) {
      const newSubscribtion = new Subscribtion(req.body);
      try {
        const savedSubscribtion = await newSubscribtion.save();
        res.status(201).json(savedSubscribtion);
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
        const updatedSubscribtion = await Subscribtion.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedSubscribtion);
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
        await Subscribtion.findByIdAndDelete(req.params.id);
        res.status(200).json("The subscribtion has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
}

exports.get = async (req, res) => {
    try {
      const subscribtion = await Subscribtion.findById(req.params.id);
      res.status(200).json(subscribtion);
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.getAll = async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const subscribtions = await Subscribtion.find();
        res.status(200).json(subscribtions.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
}