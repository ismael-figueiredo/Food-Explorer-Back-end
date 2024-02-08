import knex from "../database/knex/index.js"
import AppError from "../utils/AppError.js"
import DiskStorage from "../providers/diskstorage.js"

class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ id }) {
    const dish = await knex("dish").where({ id }).first()
    if (!dish) {
      throw new AppError("Informe um id vádido", 400)
    }
    const dishDeleted = await this.dishRepository.delete({
      id,
    })

    const diskStorage = new DiskStorage()

    if (dish.image) {
      await diskStorage.deleteFile(dish.image)
    }

    return dishDeleted
  }
  
}

export default DishDeleteService
