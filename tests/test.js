const { expect, assert } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
// const models = require("../models")(knex);
const { setupServer } = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
// chai.should();

// Another reason we separated creating our server from starting it
const app = setupServer();

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("babies", () => {
  describe("setup", () => {
    it("able to connect to database", () =>
      knex
        .raw("select 1+1 as result")
        .catch(() => assert.fail("unable to connect to db")));

    it("has run the initial migrations", () =>
      knex("babies")
        .select()
        .catch(() => assert.fail("countries table is not found.")));
  });
});

describe("The express server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  describe("get api", () => {
    describe("GET /api/babies", () => {
      it("should return all babies", async () => {
        const res = await request.get("/api/babies");
        expect(JSON.parse(res.text)).to.deep.equal([
          { id: 1, baby_name: "kota", country_code: "JP" },
          { id: 2, baby_name: "john", country_code: "US" },
          { id: 3, baby_name: "suzan", country_code: "UK" },
        ]);
      });
    });

    describe("GET /api/babies/:country_id", () => {
      it("should return babies in Japan", async () => {
        const res = await request
          .get("/api/babies/:country_code")
          .query({ country_code: "JP" });
        expect(JSON.parse(res.text)).to.deep.equal([
          { id: 1, baby_name: "kota", country_code: "JP" },
        ]);
      });
    });
  });
});
