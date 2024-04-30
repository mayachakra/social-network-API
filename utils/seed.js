const connection = require('../config/connection');
const {User, Thought} = require('../models');
const {users, thoughts} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    //drop pre-existing data if there is any
    //do we need??
    await User.deleteMany({});
    await Thought.deleteMany({});

    //creates thoughts
    const userObj = await User.create(users);
    const thoughtObj = await Promise.all(
        thoughts.map(async (thought) => {
            const user = userObj.find((user) => user.username === thought.username);
            const newThought = await Thought.create({
                thoughtText: thought.thoughtText,
                username: user.username,
                reactions: thought.reactions.map((reaction) => ({
                    reactionBody: reaction.reactionBody,
                    username: reaction.username,
                })),
            });
            return newThought;
        })
    );

    //updates users with thoughts
    const updatedUserObj = await Promise.all(
        userObj.map(async (user) => {
            const thoughts = thoughtObj.filter(
                (thought) => thought.username === user.username
            );
            const thoughtIds = thoughts.map((thought) => thought._id); //_id primary key thats auto-made?? 
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $push: {thoughts: thoughtIds}},
                { new: true}
            );
            return updatedUser;
        })
    );

    //updates users with friends
    const updatedFriendObj = await Promise.all(
        updatedUserObj.map(async (user) => {
            const friendIds = users
            .filter((userData) => userData.friends.includes(user._id))
            .map((userData) => updatedUserObj.find((updatedUser) => updatedUser._id.toString() === userData._id.toString())._id);
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $push: { friends: friendIds}},
                {new: true}
            );
            return updatedUser;
        })
    );
    console.log('Seeded successfully');
    process.exit(0);
});