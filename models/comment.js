// comment.js

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
    title: String,
    content: String,
    loadId: { type: Schema.Types.ObjectId, ref: 'Load' }
});

module.exports = Comment
