const config = require("./config");

const knex = require("knex")(config.db);
const models = require("./models")(knex);

const express = require("express");

const setupServer = () => {
  const app = express();
  // const path = require("path");

  // app.use(express.static(path.join(__dirname)));

  // const div = document.getElementById('display');

  app.use(express.json());
  app.use(express.urlencoded({ expected: true }));

  app.get("/api/babies", async (req, res) => {
    const babies = await models.babies.read();
    console.log("************* babies1 ***********", babies);
    const serializedBabies = babies.map((baby) => baby.serialize());
    res.send(serializedBabies);
  });

  app.get("/api/babies/:country_code", async (req, res) => {
    console.log("************* req.params **************", req.params);
    const babies = await models.babies.read(req.params);
    console.log("************* babies2 ***********", babies);
    const serializedBabies = babies.map((baby) => baby.serialize());
    res.send(serializedBabies);
  });

  app.post("/api/babies/", async (req, res) => {
    const response = await models.babies.create(req.body);
    console.log("*********** response ***********", response);
    res.send(response);
  });

  return app;
};

module.exports = { setupServer };
