const { expect, assert } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);
const { setupServer } = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

// Another reason we separated creating our server from starting it
const app = setupServer();

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("countries", () => {
  describe("setup", () => {
    it("able to connect to database", () =>
      knex
        .raw("select 1+1 as result")
        .catch(() => assert.fail("unable to connect to db")));

    it("has run the initial migrations", () =>
      knex("countries")
        .select()
        .catch(() => assert.fail("countries table is not found.")));
  });
});

describe("The express server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  describe("express basics", () => {
    describe("GET /teapot - modifying status", () => {
      it("should return status 418", async () => {
        const res = await request.get("/teapot");
        res.should.have.status(418);
      });
    });

    describe("GET /hello - returning text", () => {
      it("should return the text/html 'world'", async () => {
        const res = await request.get("/hello");
        res.should.be.html;
        res.text.should.equal("world");
      });
    });
  });
  describe("test", () => {
    describe("GET /api/test - get DB data", () => {
      it("test!!! ", async () => {
        const res = await request.get("/api/test");
        res.text.should.deep.equal(
          '[{"id":7,"code":"jp"},{"id":8,"code":"us"},{"id":9,"code":"uk"}]'
        );
      });
    });
  });
});

// describe("#create", () => {
//   let params = { code: "" };

// context("when bad params are given", () => {
//   before(() => {
//     params = { code: " " };
//   });

//   it("politely refuses", () =>
//     models.countries
//       .create(params)
//       .then(forcePromiseReject)
//       .catch((err) =>
//         expect(err.message).to.equal(
//           "Country code must be provided, and be two characters"
//         )
//       ));
// });

//   context("when good params are given", () => {
//     before(() => {
//       params.code = "jp";
//     });

//     afterEach(() => knex("countries").del()); // delete all users after each spec

//     it("creates a country", () =>
//       models.countries.create(params).then((country) => {
//         expect(country).to.include({ code: params.code });
//         expect(country.id).to.be.a("number");
//       }));

//     context("when a duplicate code is provided", () => {
//       beforeEach(() => models.countries.create(params));

//       it("generates a sanitized error message", () =>
//         models.users
//           .create(params)
//           .then(forcePromiseReject)
//           .catch((err) =>
//             expect(err.message).to.equal("That username already exists")
//           ));
//     });
// });
// });

// describe("#read", () => {
//   const countryCodes = ["jp", "us"];
//   const countries = countryCodes.map((countryCode) => ({ countryCode }));

//   before(() => Promise.all(countries.map(models.country.create)));
//   after(() => knex("country").del());

//   it("read all countries", () =>
//     models.users.list().then((resp) => {
//       expect(usernames).to.include(resp[0].username);
//       expect(usernames).to.include(resp[1].username);
//     }));

//   it("returns serializable objects", () =>
//     models.users.list().then((resp) => {
//       expect(resp[0].serialize).to.be.a("function");
//       expect(resp[0].serialize().id).to.be.a("number");
//       expect(resp[0].serialize().username).to.be.a("string");
//     }));
// });
// });
