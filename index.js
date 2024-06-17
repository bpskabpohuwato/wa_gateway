const { config } = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");
const MainRouter = require("./app/routers");
const errorHandlerMiddleware = require("./app/middlewares/error_middleware");
const whatsapp = require("wa-multi-session");

var fs = require("fs");
var util = require("util");
const { min } = require("moment/moment");

console.log = function() {
  const dateTimeObject = new Date();
  
  let date_ob = new Date(dateTimeObject.getTime() + (8 * 3600 * 1000));
  
  let year = date_ob.getFullYear();
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let day = ("0" + date_ob.getDate()).slice(-2);
  let today = year + "-" + month + "-" + day;

  let hours = ("0" + date_ob.getHours()).slice(-2);
  let minutes = ("0" + date_ob.getMinutes()).slice(-2);
  let seconds = ("0" + date_ob.getSeconds()).slice(-2);
  let now = hours + ":" + minutes + ":" + seconds;

  var logFile = fs.createWriteStream("logs/" + today + ".txt", {flags: "a"});
  var logStdout = process.stdout;

  logFile.write(now + "\n" + util.format.apply(null, arguments) + "\n");
  logStdout.write(now + "\n" + util.format.apply(null, arguments) + "\n");
}
console.error = console.log;

config();

var app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
// Public Path
app.use("/p", express.static(path.resolve("public")));
app.use("/p/*", (req, res) => res.status(404).send("Media Not Found"));

app.use(MainRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || "5000";
app.set("port", PORT);
var server = http.createServer(app);
server.on("listening", () => console.log("APP IS RUNNING ON PORT " + PORT));

server.listen(PORT);

whatsapp.onConnected((session) => {
  console.log("connected to {" + session + "}");
});

whatsapp.onDisconnected((session) => {
  console.log("disconnected from {" + session + "}");
});

whatsapp.onConnecting((session) => {
  console.log("connecting to {" + session + "}");
});

whatsapp.onMessageReceived((msg) => {
/*
  console.log("Received On : "+ msg.sessionId + " >>>", msg);
*/
});

whatsapp.loadSessionsFromStorage();
