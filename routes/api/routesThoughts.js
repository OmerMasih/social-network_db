const router = require("express").Router();
const {
  allThoughts,
  singleThought,
  newThought,
  getupdateThought,
  getDeleteThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thought-Controller");

router.route("/").get(allThoughts).post(newThought);

router
  .route("/:thoughtId")
  .get(singleThought)
  .put(getupdateThought)
  .delete(getDeleteThought);

router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(removeReaction);

module.exports = router;
