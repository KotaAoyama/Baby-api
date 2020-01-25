const config = require("./config");

const knex = require("knex")(config.db);
const models = require("./models")(knex);

const express = require("express");

const setupServer = () => {
  const app = express();
  const path = require("path");

  app.use(express.static(path.join(__dirname)));

  // const div = document.getElementById('display');

  app.use(express.json());

  app.get("/teapot", (req, res) => {
    // res.status(418);
    // res.end();
    res.sendStatus(418);
  });

  app.get("/hello", (req, res) => {
    res.send("world");
  });

  app.get("/hellojson", (req, res) => {
    // res.send({ hello: "world" });
    res.json({ hello: "world" });
  });

  app.get("/greet", (req, res) => {
    const name = req.query.name;
    res.send(`Hello ${name}!`);
  });

  app.get("/:first/plus/:second", (req, res) => {
    const { first, second } = req.params;
    res.json({ result: ~~first + ~~second });
  });

  app.use(express.json());
  app.use(express.urlencoded({ expected: true }));

  app.post("/echo", (req, res) => {
    res.send(req.body);
  });

  app.options(
    "/echo",
    (req, res, next) => {
      res.type("application/json");
      next();
    },
    (req, res) => {
      const reqBody = req.body;
      const resBody = {};

      for (const key in reqBody) {
        resBody[reqBody[key]] = key;
      }

      res.send(resBody);
    }
  );

  app.get("/secret", (req, res) => {
    const token = req.query.token;
    if (+token % 2 === 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });

  app.post(
    "/secret/message",
    (req, res, next) => {
      const token = req.query.token;
      if (token === "2018") {
        res.statusCode = 200;
      } else if (token === "6") {
        res.statusCode = 403;
      } else {
        res.statusCode = 401;
      }
      next();
    },
    (req, res, next) => {
      res.type("text/html");
      next();
    },
    (req, res) => {
      if (req.body.key === 42 && req.body.shout === "marco") {
        res.send("polo");
      }
      res.end();
    }
  );

  app.get("/api/test", async (req, res) => {
    // const limit = req.query.limit;
    const countries = await models.countries.read();
    const serializedCountries = countries.map((country) => country.serialize());
    res.send(serializedCountries);
  });

  return app;
};

module.exports = { setupServer };
