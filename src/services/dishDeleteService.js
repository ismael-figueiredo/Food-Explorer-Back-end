import AppError from "../utils/AppError.js"

class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ id }) {
    const checkIdExistis = await this.dishRepository.findById(id)

    if (!checkIdExistis) {
      throw new AppError("Id inexistente!", 400)
    }

    await this.dishRepository.delete({ id })

    return { message: "Prato deletado com sucesso!" }
  }
}

export default DishDeleteService
