const config = require("./config");
const knex = require("knex")(config.db);
const models = require("./models")(knex);
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const setupServer = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("./public"));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use((err, req, res, next) => {
    if (err.stack) {
      if (err.stack.match("node_modules/body-parser"))
        return res.status(400).send("Invalid JSON");
    }
    return res.status(500).send("Internal Error.");
  });

  app.get("/api/babies", async (req, res) => {
    const babies = await models.babies.list(req.query);
    const serializedBabies = babies.map((baby) => baby.serialize());
    res.send(serializedBabies);
  });

  app.get("/api/babies/:country_code", async (req, res) => {
    const babies = await models.babies.get(req.params);
    const serializedBabies = babies.map((baby) => baby.serialize());
    res.send(serializedBabies);
  });

  app.post("/api/babies", async (req, res) => {
    const response = await models.babies.create(req.body);
    res.send(response);
  });

  app.patch("/api/babies/:baby_name/:country_code", async (req, res) => {
    const response = await models.babies.update(req.params, req.body);
    res.send(response);
  });

  app.delete("/api/babies/:baby_name/:country_code", async (req, res) => {
    const response = await models.babies.delete(req.params);
    res.send(response);
  });

  return app;
};

module.exports = { setupServer };
