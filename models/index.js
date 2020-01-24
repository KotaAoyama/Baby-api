module.exports = function(knex) {
  return {
    baby: require("./baby")(knex),
    country: require("./country")(knex),
  };
};
