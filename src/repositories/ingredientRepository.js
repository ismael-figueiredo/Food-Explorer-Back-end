import knex from "../database/knex/index.js"

class IngredientRepository {
  async create({ name, dish_id }) {
    const ingredients = await knex("ingredients").insert({
      name,
      dish_id,
    })

    const [id] = ingredients
    return id
  }

  async update({ name, dish_id }) {
    await knex("ingredients").where({ dish_id }).delete({ dish_id })

    const ingredients = await knex("ingredients").insert({
      name,
      dish_id,
    })

    const [id] = ingredients
    return id
  }
}

export default IngredientRepository
