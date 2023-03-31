const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    profilePic: String
    posts: [ID]
    accessToken: String
  }
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    login(username: String, password: String): User
  }
  type Mutation {
    createUser(username: String, email: String, password: String): User
    updateUser(
      id: ID!
      username: String
      email: String
      password: String
      profilePic: String
      posts: [ID]
    ): User!
    deleteUser(id: ID!): String
  }
`;
