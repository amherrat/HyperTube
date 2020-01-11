const mongoose = require("../db/db");
var Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }, 
    id_film: String,
    hash_film: String,
    comment: String,
    date: Date,
 });
  
const Comment = mongoose.model("comment", commentSchema);

exports.commentAdd = async (objComment) => {
    const com = new Comment(objComment);
    return await com.save(); 
}

exports.commentGet = async (objComment) => {
    return await Comment.find(objComment).populate(
        {
            path: 'user',
            select: 'profil login'
        }
    );
}

exports.commentNB = async (objComment) => {
    return await Comment.find({ user: objComment});
}
