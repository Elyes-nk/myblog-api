const Post = require("../../models/Post");

module.exports = {
  Query: {
    getPosts: () => {
      return Post.find().catch(err).populate("user");
    },
    getPost: (parent, args) => {
      return Post.findById(args.id).catch(err).populate("user");
    },
  },
  Mutation: {
    createPost: (parent, args) => {
      const newPost = new Post(args);
      return newPost.save();
    },
    updatePost: (parent, args) => {
      // const movie = Movie.find(movie => movie.id === args.id);
      // if (!movie) throw new Error('Movie not found');
      // // This way, only the fields that are passed-in will be changed.
      // if (typeof args.data.name === "string") movie.name = args.data.name;
      // if (typeof args.data.description === "string") movie.description = args.data.description;
      // if (typeof args.data.price === "double") movie.price = args.data.price;
      // return movie;
      // return Movie.findByIdAndUpdate(id, { title: title, description: description, img: img, price: price });
    },
    deletePost: (parent, args) => {
      // const movieIndex = Movie.filter((movie) => user.id !== args.id);
      // if (movieIndex === -1) throw new Error('Movie not found');
      // const movie = Movie.splice(movieIndex, 1);
      // return movie[0];
    },
  },
};
