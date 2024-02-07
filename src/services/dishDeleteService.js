import AppError from "../utils/AppError.js"

class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ id }) {
    const dishDeleted = await this.dishRepository.delete({
      id,
    })

    return dishDeleted
  }
}

export default DishDeleteService
