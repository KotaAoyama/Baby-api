const config = require("./config");

const knex = require("knex")(config.db);
const models = require("./models")(knex);

const express = require("express");

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ expected: true }));

  app.get("/api/babies", async (req, res) => {
    const babies = await models.babies.read();
    const serializedBabies = babies.map((baby) => baby.serialize());
    res.send(serializedBabies);
  });

  app.get("/api/babies/:country_code", async (req, res) => {
    const babies = await models.babies.read(req.params);
    const serializedBabies = babies.map((baby) => baby.serialize());
    res.send(serializedBabies);
  });

  app.post("/api/babies/", async (req, res) => {
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
