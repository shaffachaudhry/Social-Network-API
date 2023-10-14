const {Schema, model} = require("mongoose");

// Creating a schema for users
const userSchema = new Schema({
    username: {
        type: String,
        unique: true, // ensuring unique usernames
        required: true, // ensuring requirwd usernames
        trim: true // removing any leading or trailing whitespace
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "plaese enter a valid email address",]
        // validating the email format using a regular expression
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    toJSON: {
        virtuals: true, // enabling virtuals for the user schema
    },
    id: false
});
// Creating a virtual property for the user schema to retrieve the count of friends
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

const User = model("User", userSchema);
module.exports = User;