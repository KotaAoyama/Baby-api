const validateCountryCodeLength = (countryCode) => {
  return (
    typeof countryCode === "string" && countryCode.replace(" ", "").length === 2
  );
};

module.exports = (knex, Baby) => {
  return (body) => {
    const babyName = body.baby_name;
    const countryCode = body.country_code;

    if (!validateCountryCodeLength(countryCode)) {
      return Promise.reject(
        new Error("country_code must be provided, and be two characters")
      );
    }

    // TODO: Validate: prohibit BabyName from duplicating i

    return knex("babies")
      .insert({
        baby_name: babyName.toLowerCase(),
        country_code: countryCode.toUpperCase(),
      })
      .then(() => {
        return knex("babies")
          .where({
            baby_name: babyName.toLowerCase(),
            country_code: countryCode.toUpperCase(),
          })
          .select();
      })
      .then((babies) => new Baby(babies.pop())) // create a baby model out of the plain database response
      .catch((err) => Promise.reject(err));
  };
};
