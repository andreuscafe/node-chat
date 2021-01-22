const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = 5000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  console.log("Usuario conectado");

  socket.on("chat message", function (msg) {
    console.log(msg);

    io.emit("chat message", msg);
  });

  socket.on("disconnect", function () {
    console.log("Usuario desconectado");
  });
});

http.listen(port, function () {
  console.log(`escuchar en *: ${port}`);
});
