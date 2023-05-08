const { User, Thought } = require("../models");

// Fetch all thoughts
const allThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittings to get single thought
const singleThought = async (req, res) => {
  try {
    const getThought = await Thought.findOne({ _id: req.params.thoughtId });

    res.json(getThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittings to create a new thought
const newThought = async (req, res) => {
  const { thoughtText, username, userId } = req.body;
  try {
    const addThought = await Thought.create({ thoughtText, username });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { thoughts: addThought._id } },
      { new: true }
    );

    res.json({ addThought, updatedUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittings to get update thoughts
const getupdateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: { ...req.body } },
      { new: true }
    );

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sitting to delete thought
const getDelete = async (req, res) => {
  try {
    const deletedThought = await Thought.deleteOne({
      _id: req.params.thoughtId,
    });

    res.json(deletedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittings to add friend id to thought
const createReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $addToSet: { reactions: { username, reactionBody } } },
      { new: true }
    );

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittingd to delete friend id from thought
const reactionDelete = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionId } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    );

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  allThoughts,
  singleThought,
  newThought,
  getupdateThought,
  getDelete,
  createReaction,
  reactionDelete,
};
