const router = require('express').Router();
//Deconstructing
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

//Assigning routes
router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
router.route("/reactions/:thoughtId").post(addReaction);

module.exports = router;