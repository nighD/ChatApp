const Room = require("../models/room-model");

const getMessage = (req, res) => {
    Room.find({ name : req.body.data.name}, {},(err, room) => {
    if (err) {
      res.send(err);
    }
    res.json(room);
  });
};

const createMessage = async (req, res) => {
  const room = new Room({
    name: req.body.name,
    text: req.body.text,
    username: req.body.username,
    time: req.body.time
  });

  room.save((err, room) => {
    if (res) {
      if (err) {
        res.send(err);
      } else
        res.json(room);
    } else {
      if (err) return false;
      else return true;
    }
  });
};

module.exports = {
  getMessage,
  createMessage
}