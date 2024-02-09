import AppError from "../utils/AppError.js"

class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async handleIngrdients(ingredients) {
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

  async execute({ name, category, description, price, image, user_id }) {
    if (!image) {
      throw new AppError("Imagem não definida!", 400)
    }

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
      image,
    })

    return dishCreated
  }
}

export default DishCreateService
