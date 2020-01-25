const Country = function(dbCountry) {
  this.id = dbCountry.id;
  this.code = dbCountry.code;
};

Country.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    code: this.code,
  };
};

module.exports = (knex) => {
  return {
    // create: require("./create")(knex, Country),
    read: require("./read")(knex, Country),
  };
};
