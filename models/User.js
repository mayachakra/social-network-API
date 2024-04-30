const {Schema, model} = require('mongoose');
//const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']  //look into Mongoose matching validation
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON:{
            getters: true,
            virtuals: true,
        },
        //id: false, //so Mongoose registers the username as the primary key instead of creating a default id
    }
);

//virtual for friencCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user18', userSchema);

module.exports = User;