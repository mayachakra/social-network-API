const {Schema, Types} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody:{
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt:{
            type:Date,
            default: Date.now,
            get: (timestamp) => formatDate(timestamp),
        },
    },
    {
        toJSON:{
            getters: true,
            virtuals: true,
        },
        id:false,
    }
);

//Use a getter method to format the timestamp on query
function formatDate(dateObj){
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;

}

module.exports = reactionSchema;