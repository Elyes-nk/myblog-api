const User = require("../../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    getUsers: () => {
      return User.find().populate("posts");
    },
    getUser: (parent, args) => {
      return User.findById(args.id).populate("posts");
    },
    login: async (parent, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user) throw new Error("Wrong credentials!");

      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (originalPassword !== args.password)
        throw new Error("Wrong credentials!");

      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "5d",
      });
      const { password, ...info } = user._doc;
      return { ...info, accessToken }; 
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { password, ...otherArgs } = args;
      const pass = CryptoJS.AES.encrypt(
        args.password,
        process.env.SECRET_KEY
      ).toString();
      const newUser = new User({ ...otherArgs, password: pass });
      return newUser.save();
    },
    updateUser: (parent, args) => {
      // const user = User.find(user => user.id === args.id);
      // if (!user) throw new Error('User not found');
      // // This way, only the fields that are passed-in will be changed.
      // if (typeof args.data.username === "string") user.username = args.data.username;
      // if (typeof args.data.email === "string") user.email = args.data.email;
      // if (typeof args.data.password === "string") user.password = args.data.password;
      // return user;
    },
    deleteUser: (parent, args) => {
      // const userIndex = User.filter((user) => user.id !== args.id);
      // if (userIndex === -1) throw new Error('User not found');
      // const user = User.splice(userIndex, 1);
      // return user[0];
    },
  },
};
