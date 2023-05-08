const { User, Thought } = require("../models");

// Sittings to gets all user
const allUsers = async (req, res) => {
  try {
    const users = await User.find({}).exec();

    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittings to get single user
const getuserById = async (req, res) => {
  try {
    const fetchUser = await User.find({ _id: req.params.userId })
      .populate(["friends", "thoughts"])
      .exec();

    res.json(fetchUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittings to create user
const addUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const newUser = await User.create({ username, email });

    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittings to update user
const getupdateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { ...req.body } },
      { new: true }
    );

    updatedUser
      ? res.json(updatedUser)
      : res.json({ message: "No user found" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittings to delete user
const setdeleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId).exec();

    if (deletedUser) {
      await Thought.deleteMany({ username: deletedUser.username });

      res.json(deletedUser);
    } else res.json({ message: "No user deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittings to add friend id to user
const newFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const results = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    ).exec();

    results ? res.json(results) : res.json({ message: "No user found" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Sittings to delete friend id from user
const removeFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const results = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    ).exec();

    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  allUsers,
  getuserById,
  addUser,
  getupdateUser,
  setdeleteUser,
  newFriend,
  removeFriend,
};
