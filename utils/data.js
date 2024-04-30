const users = [
    {
        username: 'mayachakra',
        email:'mayachakra@gmail.com',
        thoughts: [],
        friends: [],
    },
    {
        username: 'zendaya',
        email:'zendaya@gmail.com',
        thoughts: [],
        friends: [],
    },
];

const thoughts = [
    {
        thoughtText: 'Wow, this is cool!',
        username: 'mayachakra',
        reactions: [],
    },
    {
        thoughtText: 'Amazing!',
        username: 'zendaya',
        reactions: [
            {
                reactionBody: 'Thank You!',
                username: 'mayachakra',
            },
        ],
    },

];

module.exports = { users, thoughts };