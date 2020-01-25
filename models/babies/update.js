const validateCountryCode = (countryCode) =>
  typeof countryCode === "string" && countryCode.replace(" ", "").length === 2;

module.exports = (knex, Baby) => {
  return (params, body) => {
    const beforeBabyName = params.baby_name;
    const countryCode = params.country_code;
    const afterBabyName = body.baby_name;

    if (!validateCountryCode(countryCode)) {
      return Promise.reject(
        new Error("country_code must be provided, and be two characters")
      );
    }

    return knex("babies")
      .where({
        baby_name: beforeBabyName.toLowerCase(),
        country_code: countryCode.toUpperCase(),
      })
      .update({
        baby_name: afterBabyName.toLowerCase(),
      })
      .then(() => {
        return knex("babies")
          .where({
            baby_name: afterBabyName.toLowerCase(),
            country_code: countryCode.toUpperCase(),
          })
          .select();
      })
      .then((babies) => new Baby(babies.pop())) // create a baby model out of the plain database response
      .catch((err) => Promise.reject(err));
  };
};
