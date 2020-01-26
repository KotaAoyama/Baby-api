module.exports = (knex, Baby) => {
  return (params) => {
    return knex("babies")
      .where({ country_code: params.country_code })
      .select()
      .then((babies) => {
        return babies.map((baby) => {
          return new Baby(baby);
        });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
