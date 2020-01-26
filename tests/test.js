const { expect, assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);
// const { setupServer } = require("../server");
// const app = setupServer();

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
        .catch(() => assert.fail("babies table is not found.")));
  });

  describe("#create", () => {
    let body = { baby_name: "", country_code: "" };

    context(
      "when bad request body are given: baby_name is space string",
      () => {
        before(() => {
          body = { baby_name: " " };
        });

        it("politely refuses", () =>
          models.babies
            .create(body)
            .then(forcePromiseReject)
            .catch((err) =>
              expect(err.message).to.equal("baby name must be provided")
            ));
      }
    );

    context(
      "when bad request body are given: country_code is not correct",
      () => {
        before(() => {
          body = { baby_name: "ai", country_code: "xx" };
        });

        it("politely refuses", () =>
          models.babies
            .create(body)
            .then(forcePromiseReject)
            .catch((err) =>
              expect(err.message).to.equal("country code must be justify")
            ));
      }
    );

    context("when good request body are given", () => {
      before(() => {
        body.baby_name = "ai";
        body.country_code = "jp";
      });

      after(() => knex("babies").del());

      it("creates a baby", () =>
        models.babies.create(body).then((baby) => {
          expect(baby).to.include({
            baby_name: body.baby_name.toLocaleLowerCase(),
          });
          expect(baby).to.include({
            country_code: body.country_code.toUpperCase(),
          });
          expect(baby.id).to.be.a("number");
        }));
    });
  });

  describe("#list", () => {
    const babies = [
      { baby_name: "ai", country_code: "JP" },
      { baby_name: "mi", country_code: "US" },
      { baby_name: "shelly", country_code: "US" },
    ];

    before(() => Promise.all(babies.map(models.babies.create)));
    after(() => knex("babies").del());

    it("lists all babies", () => {
      models.babies
        .list()
        .then((babies) => babies.map((baby) => baby.serialize()))
        .then((res) => {
          expect(res).to.deep.include(babies[0]);
          expect(res).to.deep.include(babies[1]);
          expect(res).to.deep.include(babies[2]);
          expect(res.length).to.equal(babies.length);
        });
    });
  });
});
