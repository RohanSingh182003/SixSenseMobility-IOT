const User = require("../models/userSchema");

module.exports = {
  get: async (req, res) => {
    try {
      let users = await User.find();
      res.send(users);
    } catch (error) {
      res.send(error);
    }
  },

  getSingleUser: async (req, res) => {
    try {
      let _id = req.params.id;
      let user = await User.find({ _id });

      if (user.length != 0) {
        res.send(user);
      } else {
        res.send("user doesn't exists");
      }
    } catch (error) {
      res.send(error);
    }
  },

  post: async (req, res) => {
    let user = await User.find({ email: req.body.email });
    if (user.length != 0) {
      res.send("email already exists! try an different one.");
    } else {
      let newUser = new User({
        email: req.body.email,
        password: req.body.password,
      });

      try {
        let response = await newUser.save();
        if (response.length != 0) {
          res.send(response);
        } else {
          res.send("an error occured!");
        }
      } catch (error) {
        res.send(error);
      }
    }
  },

  put: async (req, res) => {
    try {
      let _id = req.params.id;
      let user = await User.find({ _id });

      if (user.length != 0) {
        let newUser = await User.findByIdAndUpdate(
          { _id },
          {
            password: req.body.password,
          }
        );
        res.send(newUser);
      } else {
        res.send("user doesn't exists");
      }
    } catch (error) {
      res.send(error);
    }
  },

  delete: async (req, res) => {
    let _id = req.params.id;
    try {
      let user = await User.find({ _id });
      if (user.length != 0) {
        let op = await User.findByIdAndDelete({ _id });
        res.send(op);
      } else {
        res.send("user doesn't exists.");
      }
    } catch (error) {
      res.send(error);
    }
  },
};
