//any aggregate methods for accessing arrays, matching, etc ref. miniproject code mod 18

//Thought CRUD actions here as async functions
// CRUD names in thought-routes


const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');


module.exports = {
    //CRUD
    async getThoughts(req, res){
        try{
            const thoughts = await Thought.find().populate('reactions');
            res.json(thoughts);
        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async getSingleThought(req, res){
        try{
            const singleThought = await Thought.findOne({_id: ObjectId(req.params.thoughtId)})
            .populate('reactions');
            if(!singleThought){
                return res.status(404).json({message: 'No thought with that id'});
            }
            res.json(singleThought);

        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async createThought(req, res){
        try{
            const newThought = await Thought.create(req.body);
            res.json(newThought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async updateThought(req, res){
        try{
            const thoughtUpdate = await Thought.findOneAndDelete(
                {_id: ObjectId(req.params.thoughtId)},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if (!thoughtUpdate){
                return res.status(404).json({message: 'No thought with this username'});
            }
            res.json(thoughtUpdate);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //check over this compared to userController
    async deleteThought(req, res){
        try{
            const deletedThought = await Thought.findOneAndDelete({_id: ObjectId(req.params.thoughtId)});
            if (!deletedThought){
                return res.status(404).json({message: 'No thought with this id'});
            }
            await User.updateMany({thoughts: deletedThought._id}, {$pull: {thoughts: deletedThought._id}});
            res.json({message: 'Thought Deleted!'});

        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async addReaction(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: ObjectId(req.params.thoughtId)},
                { $addToSet: {reactions: req.body}},
                {new: true, runValidators: true}
            );
            if(!thought){
                return res.status(404).json({message: 'Thought not found'});
            }
            res.json(thought);

        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async deleteReaction(req, res){
        try{
            const thought = await Thought.findOneAndDelete(
                {_id: ObjectId(req.params.thoughtId)},
                { $pull: {reactions: ObjectId(req.params.reactionId)}},
                {new: true}
            );
            if(!thought){
                return res.status(404).json({message: 'Thought not found'});
            }
            //res.json(thought);
            res.json({message: 'Reaction Deleted!'});
        }catch(err){
            res.status(500).json(err);
        }
    },
};