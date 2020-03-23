const validateBabyName = (babyName) => {
  return typeof babyName === "string" && babyName.replace(" ", "").length !== 0;
};

const countryNames = require("../../data/countryNames");
const validateCountryCodeJustify = (countryCode) => {
  const countryCodes = Object.keys(countryNames);
  return countryCodes.includes(countryCode.toUpperCase());
};

module.exports = (knex, Baby) => {
  return (body) => {
    const babyName = body.baby_name;
    const countryCode = body.country_code;

    if (!validateBabyName(babyName)) {
      return Promise.reject(new Error("baby name must be provided"));
    }

    if (!validateCountryCodeJustify(countryCode)) {
      return Promise.reject(new Error("country code must be justify"));
    }

    // TODO: Validate: prohibit BabyName from duplicating in a country

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
      .then((babies) => new Baby(babies.pop()))
      .catch((err) => Promise.reject(err));
  };
};
