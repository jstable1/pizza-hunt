const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment_id
      replyId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
      },
      replyBody: {
        type: String,
        required: 'You need to fill out your reply!',
        trim: true
      },
      writtenBy: {
        type: String,
        required: 'Your name is required!'
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
        toJSON: {
            getters: true
        }
    }
  );

const CommentSchema = new Schema({
    writtenBy: {
        type: String,
        required: 'Your name is required!',
        trim: true
    },
    commentBody: {
        type: String,
        required: 'You need to input a comment',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });

const Comment = model('Comment', CommentSchema);

module.exports = Comment;