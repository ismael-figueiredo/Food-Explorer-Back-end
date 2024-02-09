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
}

export default IngredientRepository
