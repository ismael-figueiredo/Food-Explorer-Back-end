import DishRepository from "../repositories/dishRepository.js"
import knex from "../database/knex/index.js"
import IngredientRepository from "../repositories/ingredientRepository.js"

import DishCreateService from "../services/dishCreateService.js"
import DishDeleteService from "../services/dishDeleteService.js"

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

  async delete(request, response) {
    const { id } = request.params
    if (!id) {
      throw new AppError("Id inesistente!", 400)
    }
    const dishRepository = new DishRepository()
    const dishDeleteService = new DishDeleteService(dishRepository)
    await dishDeleteService.execute({ id })

    return response.status(200).json()
  }

  async index(request, response) {
    const { search } = request.query

    let dishes = await knex("dish")
      .select(
        "dish.id",
        "dish.name",
        "dish.description",
        "dish.price",
        "dish.category"
      )
      .distinct()
      .leftJoin("ingredients", "dish.id", "ingredients.dish_id")
      .where("dish.name", "like", `%${search}%`)
      .orWhere("dish.category", "like", `%${search}%`)
      .orWhere("ingredients.name", "like", `%${search}%`)
      .orderBy("dish.name")

    const dishesWithIngredients = await Promise.all(
      dishes.map(async (dish) => {
        const ingredients = await knex("ingredients")
          .select("name")
          .where("dish_id", dish.id)

        const ingredientNames = ingredients.map((ingredient) => ingredient.name)

        return {
          ...dish,
          ingredients: ingredientNames,
        }
      })
    )

    return response.json({ dishes: dishesWithIngredients })
  }
  async show(request, response) {
    const { id } = request.params

    // Buscar o prato pelo ID
    const dish = await knex("dish").where({ id }).first()

    if (!dish) {
      return response.status(404).json({ message: "Dish not found" })
    }

    // Buscar os ingredientes associados ao prato
    const ingredients = await knex("ingredients")
      .select("name")
      .where("dish_id", id)

    // Mapeia os resultados para obter apenas o nome do ingrediente
    const ingredientNames = ingredients.map((ingredient) => ingredient.name)

    // Adiciona os ingredientes ao objeto do prato
    dish.ingredients = ingredientNames

    return response.json(dish)
  }
}

export default DishController
