const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors());

//==================================================couche graphQl=====================================================
const { ApolloServer, gql } = require("apollo-server-express");
const PostSchema = require("../graphql/schemas/post.schema");
const UserSchema = require("../graphql/schemas/user.schema");

const PostResolvers = require("../graphql/resolvers/post.resolver");
const UserResolvers = require("../graphql/resolvers/user.resolver");

const Auth = require("../graphQl/auth/auth");

async function startServer() {
  const graphQlServer = new ApolloServer({
    typeDefs: { ...PostSchema, ...UserSchema },
    resolvers: { ...PostResolvers, ...UserResolvers },
    context: Auth,
  });
  await graphQlServer.start();

  graphQlServer.applyMiddleware({ app, path: "/graphql" });
}
startServer();
//======================================================================================================================

//======================================================================================================================
exports.start = () => {
  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("BACKEND is running 🔥 at port : " + process.env.PORT);
  });
};
//=======================================================================================================================
