// const express = require("express");
// const http = require('http');
// const cors = require("cors");
// const socketIO = require("socket.io");
// const {testController} = require("./controller/testController")
const {server} = require("./router/app")
require("dotenv").config()

const port = process.env.PORT || 3459

// const app = express();
// const server = http.Server(app);
// app.use(cors());
// app.use(express.json());

// app.get("/test",testController);

// const io = socketIO(server,{
//     cors: {
//     origin: "http://localhost:5173",
//     }
//   });

// io.on('connection', (client:any) => {
//     client.on('client-data', (message:any) => {
//         // console.log("client-message ===> ",message);
//         io.emit("server-data", `from server replyback => ${message}`)
//     })
// })

server.listen(port, function(){
    console.log(`listening on localhost:${port}: http://localhost:${port}`);
 });




