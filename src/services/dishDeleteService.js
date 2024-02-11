import AppError from "../utils/AppError.js"

class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ id }) {
    const checkIdExistis = await this.dishRepository.findById(id)

    if (!checkIdExistis) {
      throw new AppError("Id inesistente!", 400)
    }
    const dishDeleted = await this.dishRepository.delete({
      id,
    })

    return dishDeleted
  }
}

export default DishDeleteService
