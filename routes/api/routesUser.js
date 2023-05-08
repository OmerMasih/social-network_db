const router = require("express").Router();
const {
  allUsers,
  getuserById,
  addUser,
  getupdateUser,
  setdeleteUser,
  newFriend,
  removeFriend,
} = require("../../controllers/user-Controller");

router.route("/").get(allUsers).post(addUser);

router
  .route("/:userId")
  .get(getuserById)
  .put(getupdateUser)
  .delete(setdeleteUser);

router.route("/:userId/friends/:friendId").post(newFriend).delete(removeFriend);

module.exports = router;
