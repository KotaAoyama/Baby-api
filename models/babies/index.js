class Baby {
  constructor(dbBaby) {
    this.id = dbBaby.id;
    this.baby_name = dbBaby.baby_name;
    this.country_code = dbBaby.country_code;
  }

  serialize() {
    return {
      id: this.id,
      baby_name: this.baby_name,
      country_code: this.country_code,
    };
  }
}

module.exports = (knex) => {
  return {
    create: require("./create")(knex, Baby),
    read: require("./read")(knex, Baby),
    update: require("./update")(knex, Baby),
    delete: require("./delete")(knex),
  };
};
