const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  type Post {
    _id: ID!
    title: String
    desc: String
    cat: String
    img: String
    draft: Boolean
    updatedAt: Date
    user: User
  }
  type Query {
    getPosts(cat: String, user: ID, withDraft: Boolean): [Post]
    getPost(id: ID!): Post
  }
  type Mutation {
    createPost(
      title: String
      desc: String
      img: String
      cat: String
      draft: Boolean
      user: ID!
    ): Post
    updatePost(
      id: ID!
      title: String
      desc: String
      img: String
      cat: String
      draft: Boolean
    ): Post!
    deletePost(id: ID!): String
  }
`;
