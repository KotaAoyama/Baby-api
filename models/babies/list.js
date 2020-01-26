module.exports = (knex, Baby) => {
  return (query) => {
    if (query && query.country_code) {
      return knex("babies")
        .where({ country_code: query.country_code })
        .select()
        .then((babies) => {
          return babies.map((baby) => {
            return new Baby(baby);
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    } else {
      return knex("babies")
        .select()
        .then((babies) => {
          return babies.map((baby) => {
            return new Baby(baby);
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
  };
};
