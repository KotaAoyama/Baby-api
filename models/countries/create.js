// const validateUsername = (uName) =>
//   typeof uName === "string" && uName.replace(" ", "").length > 2;

module.exports = (knex, Country) => {
  return (params) => {
    const countryCode = params.code;

    // if (!validateUsername(username)) {
    //   return Promise.reject(
    //     new Error("Username must be provided, and be at least two characters")
    //   );
    // }

    return knex("countries")
      .insert({ code: countryCode.toLowerCase() })
      .then(() => {
        return knex("countries")
          .where({ code: countryCode.toLowerCase() })
          .select();
      })
      .then((countries) => new Country(countries.pop())) // create a user model out of the plain database response
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That username already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
