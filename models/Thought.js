const {Schema, model, Types} = require("mongoose");

// Creating a schema for reactions
const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        // type of reaction ID
        default: () => new Types.ObjectId(),
        // setting a default value for the reaction ID if not provided
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
        },

    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    },
    {
    toJSON: {
        getters: true,
        // enabling getters for the reaction schema
    },
    id: false,
    }
);

// Creating a schema for thoughts
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );


  // Creating a virtual property for the thought schema to retrieve the count of reactions

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
    // Creating the Thought model based on the thought schema
  const Thought = model("Thought", thoughtSchema);
  
  module.exports = Thought;
  // exporting the module