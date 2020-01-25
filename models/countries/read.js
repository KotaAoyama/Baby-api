module.exports = (knex, Country) => {
  return () => {
    return knex("countries")
      .select()
      .then((countries) => {
        return countries.map((country) => {
          return new Country(country);
        });
      })
      .catch((err) => {
        // throw unknown errors
        console.log("err", err);
        return Promise.reject(err);
      });
  };
};
