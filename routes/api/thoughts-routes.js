const router = require('express').Router();
const{
    //these methods need to be implemeneted in the thoughtController
    //methods like..
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
    //
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reaction/:reactionId').post(addReaction).delete(deleteReaction);

module.exports = router;

// /api/thoughts
// /api/thoughts/:thoughtId/reactions

