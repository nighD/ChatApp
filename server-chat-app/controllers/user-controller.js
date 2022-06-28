const User = require("../models/user-model");

const getUser = (req, res) => {
  User.find((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

const createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    room: req.body.room
  });
  user.save((err, user) => {
    if (res) {
      if (err) {
        res.send(err);
      } else
        res.json(user);
    } else {
      if (err) return false;
      else return true;
    }
  });
};

const checkUserExist = async (req, res) => {
  const isUserExist = await User.find({
    "username": req.body.data.username,
    "room": req.body.data.room
  });
  if (isUserExist.length>0) {
    res.send(true)
  } else
    res.send(false)
}

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.userId })
    .then(() => res.json({ message: "User Deleted" }))
    .catch((err) => res.send(err));
};

module.exports = {
  getUser,
  createUser,
  deleteUser,
  checkUserExist
}