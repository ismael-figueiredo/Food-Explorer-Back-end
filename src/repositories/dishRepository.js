import DiskStorage from "../providers/diskstorage.js"
import knex from "../database/knex/index.js"

class DishRepository {
  async findByName(name) {
    const dish = await knex("dish").where({ name }).first()
    return dish
  }

  async create({ name, category, price, image, description, user_id }) {
    const dish = await knex("dish").insert({
      name,
      user_id,
      category,
      price,
      image,
      description,
    })
    const diskStorage = new DiskStorage()
    if (image) {
      await diskStorage.saveFile(image)
    }
    const [id] = dish
    return id
  }

  async delete({ id }) {
    await knex("dish").delete({ id })
  }
}

export default DishRepository
