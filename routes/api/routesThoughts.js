const router = require("express").Router();
const {
  allThoughts,
  singleThought,
  newThought,
  getupdateThought,
  getDelete,
  createReaction,
  reactionDelete,
} = require("../../controllers/thought-Controller");

router.route("/").get(allThoughts).post(newThought);

router
  .route("/:thoughtId")
  .get(singleThought)
  .put(getupdateThought)
  .delete(getDelete);

router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(reactionDelete);

module.exports = router;
