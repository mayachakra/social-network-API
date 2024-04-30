//any aggregate methods for accessing arrays, matching, etc ref. miniproject code mod 18

//User CRUD actions here as async functions
// CRUD names in user-routes


const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');


module.exports = {
    //CRUD
    async getUsers(req, res){
        try{
            const users = await User.find().populate('thoughts').populate('friends');
            // .populate('users');
            res.json(users);
        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async getSingleUser(req, res){
        try{
            const singleUser = await User.findOne({_id: ObjectId(req.params.userId)})
            .populate('thoughts')
            .populate('friends');
            if(!singleUser){
                return res.status(404).json({message: 'No user with that username'});
            }
            res.json(singleUser);

        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async createUser(req, res){
        try{
            const newUser = await User.create(req.body);
            res.json(newUser);
        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async updateUser(req, res){
        try{
            const userUpdate = await User.findOneAndDelete(
                {_id: ObjectId(req.params.userId)},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if (!userUpdate){
                return res.status(404).json({message: 'No user with this username'});
            }
            res.json(userUpdate);
        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async deleteUser(req, res){
        try{
            const user = await User.findOneAndDelete({_id: ObjectId(req.params.userId)});
            if (!user){
                return res.status(404).json({message: 'No user with this username'});
            }
            await Thought.deleteMany({username: user.username});
            res.json({message: 'User Deleted!'});

        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async addFriend(req, res){
        try{
            const user = await User.findOneAndUpdate(
                {username: ObjectId(req.params.username)},
                { $addToSet: {friends: req.params.friendId}},
                {new: true}
            );
            if(!user){
                return res.status(404).json({message: 'User not found'});
            }
            res.json(user);

        }catch(err){
            res.status(500).json(err);
        }
    },
    
    async deleteFriend(req, res){
        try{
            const user = await User.findOneAndDelete(
                {username: ObjectId(req.params.username)},
                { $pull: {friends: ObjectId(req.params.friendId)}},
                {new: true}
            );
            if(!user){
                return res.status(404).json({message: 'User not found'});
            }
            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },
};