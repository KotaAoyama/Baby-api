module.exports = function(knex) {
  return {
    // baby: require("./babies")(knex),
    countries: require("./countries")(knex),
  };
};
