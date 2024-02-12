import AppError from "../utils/AppError.js"

class DishUpdateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async handleUpdateIngrdients(ingredients) {
    let ingredientsArray

    if (typeof ingredients === "string") {
      try {
        ingredientsArray = JSON.parse(ingredients)
        if (!Array.isArray(ingredientsArray)) {
          throw new Error("Parsed ingredients is not an array.")
        }
      } catch (error) {
        throw new AppError(
          "Erro ao processar os ingredientes. Certifique-se de que estejam no formato correto.",
          400
        )
      }
    } else if (Array.isArray(ingredients)) {
      ingredientsArray = ingredients
      if (ingredients.length === 0) {
        throw new AppError("Informe os ingredientes do prato!", 400)
      }
    } else {
      throw new AppError("Formato de ingredientes inválido.", 400)
    }

    return ingredientsArray
  }

  async execute({ id, name, category, description, price, image, dish_id }) {
    if (!id || !name || !category || !description || !price || !dish_id) {
      throw new AppError("Informe todos os campos!", 400)
    }
    if (!image) {
      throw new AppError("Imagem não definida!", 400)
    }

    const dishUpdated = await this.dishRepository.update({
      id,
      name,
      dish_id,
      category,
      price,
      description,
      image,
    })

    return dishUpdated
  }
}

export default DishUpdateService
