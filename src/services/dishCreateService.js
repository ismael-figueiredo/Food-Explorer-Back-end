import AppError from "../utils/AppError.js"



class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ name, category, description, price , image, user_id }) {

    const checkDishExists = await this.dishRepository.findByName(name)
    if (checkDishExists) {
      throw new AppError("Este item já existe!", 400)
    }

    const dishCreated = await this.dishRepository.create({
      name,
      user_id,
      category,
      price,
      description,
      image
    })
   
    return dishCreated
  }
}

export default DishCreateService


