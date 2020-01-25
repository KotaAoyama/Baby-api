const validateCountryCodeLength = (countryCode) => {
  return (
    typeof countryCode === "string" && countryCode.replace(" ", "").length === 2
  );
};

// const validateBabyNameDuplicated = (knex, babyName, countryCode) => {
//   const isDuplicated = knex("babies")
//   .where({ baby_name: babyName, country_code: countryCode })
//   .select()
//   .then((babies) => {
//     if (babies.length) return babies;
//   })
//   .catch((err) => {
//     // throw unknown errors
//     return Promise.reject(err);
//   });

//   return isDuplicated ? true : false;
// }

module.exports = (knex, Baby) => {
  return (body) => {
    const babyName = body.baby_name;
    const countryCode = body.country_code;

    if (!validateCountryCodeLength(countryCode)) {
      return Promise.reject(
        new Error("country_code must be provided, and be two characters")
      );
    }

    // if (validateBabyNameDuplicated(knex, babyName, countryCode)) {
    //   return Promise.reject(
    //     new Error("baby_name must not be duplicated in a country")
    //   );
    // }

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
