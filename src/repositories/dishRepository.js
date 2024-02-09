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
    const dish = await knex("dish").where({ id }).first()
    if (!dish) {
      throw new AppError("Informe um id vádido", 400)
    }

    const diskStorage = new DiskStorage()

    if (dish.image) {
      await diskStorage.deleteFile(dish.image)
    }
    await knex("dish").delete({ id })
  }

}

export default DishRepository
