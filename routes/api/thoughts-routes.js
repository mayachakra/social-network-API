/*
/api/thoughts
GET to get all thoughts
GET to get a single thought by its _id
POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
PUT to update a thought by its _id
DELETE to remove a thought by its _id
/api/thoughts/:thoughtId/reactions
POST to create a reaction stored in a single thought's reactions array field
DELETE to pull and remove a reaction by the reaction's reactionId value

*/

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

