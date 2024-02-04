import knex from "../database/knex/index.js"

class DishRepository {
  async findByName(name) {
    const dish = await knex("dish").where({ name }).first()
    return dish
  }

  async create({ name, ingredients, password }) {
    const userId = await knex("users").insert({
      name,
      email,
      password,
    })
    return { id: userId }
  }
}

export default DishRepository
