const express = require("express");

const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.get("/api/test", (req, res) => {
    // const limit = req.query.limit;

    res.send("You are ok!");
  });

  return app;
};

module.exports = { setupServer };
