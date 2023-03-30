const User = require("../../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
  Query: {
    getUsers: () => {
      return User.find().catch((err) => console.log(err));
    },
    getUser: (parent, args) => {
      return User.findById(args.id).catch((err) => console.log(err));
    },
    login: (parent, args) => {
      try {
        const user = User.findOne({ email: args.email });
        !user && res.status(401).json("Wrong password or username!");

        const bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.SECRET_KEY
        );
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
          res.status(401).json("Wrong password or username!");

        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );

        const { password, ...info } = user._doc;
        return { ...info, accessToken };
      } catch (e) {
        // eslint-disable-next-line
        console.log("## ERROR:", e);
      }
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { password, ...otherArgs } = args;
      const pass =  CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString()
      const newUser = new User({ ...otherArgs, pass});
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
