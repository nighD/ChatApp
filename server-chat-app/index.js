const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./router");
const { getUser, createUser } = require("./controllers/user-controller");
const { createMessage } = require("./controllers/room-controller");
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(router);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(data)
    createUser({
      body: {
        username: data.username,
        room: data.room
      }
    })
    // User for testing socket
    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data)
    createMessage({
      body: {
        name: data.name,
        text: data.text,
        username: data.username,
        time: data.time
      }
    })
  });

  socket.on("disconnect", (data) => {
    console.log(data)
    // User for testing socket
    // console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
