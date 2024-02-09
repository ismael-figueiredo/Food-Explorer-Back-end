import knex from "../database/knex/index.js"
import AppError from "../utils/AppError.js"
import DiskStorage from "../providers/diskstorage.js"

class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ id }) {
    if (!id) {
      throw new AppError("Id inesistente!", 400)
    }
  
    const dishDeleted = await this.dishRepository.delete({
      id,
    })



    return dishDeleted
  }
}

export default DishDeleteService
