import DishRepository from "../repositories/dishRepository.js"
import IngredientRepository from "../repositories/ingredientRepository.js"

import DishCreateService from "../services/dishCreateService.js"
import AppError from "../utils/AppError.js"

class DishController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body
    const { id: user_id } = request.user

    const filename = request.file.filename
    if (!name || !price || !category || !description) {
      throw new AppError("Preencha todos os campos!.", 400)
    }

    const dishRepository = new DishRepository()

    if (!filename) {
      throw new AppError("Imagem não definida!", 400)
    }

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

    const dishCreateService = new DishCreateService(dishRepository)
    const dish_id = await dishCreateService.execute({
      name,
      description,
      price,
      user_id,
      image: filename,
      category,
    })
    const ingredientsToSave = ingredientsArray.map((ingredient) => {
      return {
        name: ingredient,
        dish_id,
      }
    })
    const ingredientRepository = new IngredientRepository()
    await Promise.all(
      ingredientsToSave.map((ingredient) =>
        ingredientRepository.create(ingredient)
      )
    )
    return response.status(201).json()
  }
}

export default DishController
