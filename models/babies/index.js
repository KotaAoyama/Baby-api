class Baby {
  constructor(dbBaby) {
    this.id = dbBaby.id;
    this.baby_name = dbBaby.baby_name;
    this.country_code = dbBaby.country_code;
  }

  serialize() {
    return {
      baby_name: this.baby_name,
      country_code: this.country_code,
    };
  }
}

module.exports = (knex) => {
  return {
    create: require("./create")(knex, Baby),
    list: require("./list")(knex, Baby),
    get: require("./get")(knex, Baby),
    update: require("./update")(knex, Baby),
    delete: require("./delete")(knex),
  };
};
// module.exports = Baby;
