const { Router } = require("express");
const {
  logs,
} = require("../controllers/log_controller");

const LogRouter = Router();

LogRouter.all("/logs", logs);

module.exports = LogRouter;
