const { Router } = require("express");
const LogRouter = require("./log_router");
const SessionRouter = require("./session_router");
const MessageRouter = require("./message_router");

const MainRouter = Router();

MainRouter.use(LogRouter);
MainRouter.use(SessionRouter);
MainRouter.use(MessageRouter);

module.exports = MainRouter;
