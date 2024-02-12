import DiskStorage from "../providers/diskstorage.js"
import knex from "../database/knex/index.js"

class DishRepository {
  async findByName(name) {
    const dish = await knex("dish").where({ name }).first()
    return dish
  }

  async findById(id) {
    const dish = await knex("dish").where({ id }).first()
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

  async update({ name, id, category, price, image, description }) {
    const dishUpdated = await knex("dish").where({ id }).first()
    const dish = await knex("dish").where({ id }).update({
      name,
      category,
      price,
      image,
      description,
      updated_at: new Date(),
    })
    const diskStorage = new DiskStorage()
    if (dishUpdated.image) {
      await diskStorage.deleteFile(dishUpdated.image)
    }
    if (image) {
      await diskStorage.saveFile(image)
    }

    return dish
  }

  async delete({ id }) {
    const dish = await knex("dish").where({ id }).first()

    const diskStorage = new DiskStorage()

    if (dish.image) {
      await diskStorage.deleteFile(dish.image)
    }
    await knex("dish").delete({ id })
  }
}

export default DishRepository
