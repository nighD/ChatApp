const router = require("express").Router();
const { getUser, createUser, deleteUser, checkUserExist } = require("./controllers/user-controller");
const { getMessage, createMessage } = require("./controllers/room-controller");

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

router.get("/user", getUser);
router.post("/user", createUser);
router.get("/user/:userID", deleteUser);
router.post("/isUserExist", checkUserExist);

router.post("/roomMessage", getMessage);
router.post("/room", createMessage);

module.exports = router;