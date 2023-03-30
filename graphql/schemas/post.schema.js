const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    title: String
    desc: String
    img: String
    desc: String
    draft: String
    user: ID
  }
  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }
  type Mutation {
    createPost(
      title: String
      desc: String
      img: String
      desc: String
      cat: String
      draft: Boolean
      user: ID!
    ): Post
    updatePost(
      id: ID!
      title: String
      desc: String
      img: String
      desc: String
      cat: String
      draft: Boolean
    ): Post!
    deletePost(id: ID!): String
  }
`;
