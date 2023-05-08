const connection = require("../config/config");
const { Thought, User } = require("../models");
const { getData, getThought, getReaction } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  let promises = [];
  console.log("connected");

  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = await User.create(getData);
  const thoughts = await Thought.create(getThought);

  const userIds = users.map((obj) => {
    return obj._id.toString();
  });
  const thoughtIds = thoughts.map((obj) => {
    return obj._id.toString();
  });

  userIds.forEach((id, i) => {
    const updatFriend = User.updateMany(
      { _id: { $ne: id } },
      { $addToSet: { friends: id } }
    );
    const updateThoughts = User.findOneAndUpdate(
      { _id: id },
      { $addToSet: { thoughts: thoughtIds[i] } }
    );
    const updateReaction = Thought.findByIdAndUpdate(
      thoughtIds[i],
      { $addToSet: { reactions: getReaction[i] } },
      { new: true }
    );
    promises.push(updatFriend, updateThoughts, updateReaction);
  });

  await Promise.all(promises);
  console.info("Seeding has been complete!! ");
  process.exit(0);
});
