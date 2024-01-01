const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { 
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Invalid'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    });

    userSchema.virtual('friendCount').get(function () {
        return this.friends.length;
    });

    const User = model('User', userSchema);

    module.exports = User;


/*
    ### Models

    **User**:       
    
    * `username`
      * String
      * Unique                               <- Done
      * Required
      * Trimmed
    
    * `email`
      * String
      * Required                            <- Done
      * Unique
      * Must match a valid email address (look into Mongoose's matching validation)
    
    * `thoughts`
      * Array of `_id` values referencing the `Thought` model       <- Done
    
    * `friends`
      * Array of `_id` values referencing the `User` model (self-reference)
    
    */