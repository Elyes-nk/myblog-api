const mongoose = require("mongoose");
const Post = require("../../models/Post");

module.exports = {
  Query: {
    getPosts: (parent, args = {}) => {
      const { cat, user, withDraft } = args;
      const options = {};
      // By default exclude draft posts
      if(!withDraft){
        options.draft = false
      }
      if (cat) {
        options.cat = cat;
      }
      if (user) {
        options.user = mongoose.Types.ObjectId(user);
      }
      return Post.find(options).populate("user").sort({ updatedAt: -1 });
    },
    getPost: (parent, args) => {
      return Post.findById(args.id).populate("user");
    },
  },
  Mutation: {
    createPost: (parent, args) => {
      const newPost = new Post(args);
      return newPost.save();
    },
    updatePost: (parent, args) => {
      return Post.findByIdAndUpdate(
        args.id,
        {
          $set: args.body,
        },
        { new: true }
      );
    },
    deletePost: (parent, args) => {
      return Post.findByIdAndDelete(args.id);
    },
  },
};
