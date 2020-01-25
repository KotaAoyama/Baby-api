module.exports = function(knex) {
  return {
    babies: require("./babies")(knex),
  };
};
