let express = require("express");
let app = express();
let path = require("path");
let server = require("http").createServer(app);
var io = require("socket.io")(server);

const PORT = 3000;
let messge;
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
  socket.on("setuser", (user) => {
    console.log(user);
  });
  socket.on("sendmsg", (data) => {
    io.sockets.emit("allmsg", data);
  });
});

app.get("/", (req, res) => {
  return res.sendFile(
    path.join(path.dirname(process.mainModule.filename), "PORTAL", "index.html")
  );
});

server.listen(PORT, () => {
  console.log(`Server is Running on ` + PORT);
});
