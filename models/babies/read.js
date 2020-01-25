module.exports = (knex, Baby) => {
  return (params) => {
    if (params !== undefined) {
      return knex("babies")
        .where({ country_code: params.country_code })
        .select()
        .then((babies) => {
          console.log("$$$$$$$$$$$$$$$$$ babies $$$$$$$$$$$$$$", babies);
          return babies.map((baby) => {
            return new Baby(baby);
          });
        })
        .catch((err) => {
          // throw unknown errors
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
          // throw unknown errors
          return Promise.reject(err);
        });
    }
  };
};
