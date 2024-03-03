import DishRepository from "../repositories/dishRepository.js"
import knex from "../database/knex/index.js"
import IngredientRepository from "../repositories/ingredientRepository.js"
import DishCreateService from "../services/dishCreateService.js"
import DishDeleteService from "../services/dishDeleteService.js"
import DishUpdateService from "../services/dishUpdateService.js"

class DishController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body
    const image = request.file?.filename
    const { id: user_id } = request.user

    const dishRepository = new DishRepository()
    const dishCreateService = new DishCreateService(dishRepository)

    const ingredientsArray = await dishCreateService.handleCreateIngrdients(
      ingredients
    )
    const dish_id = await dishCreateService.execute({
      name,
      description,
      price,
      user_id,
      image,
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

  async update(request, response) {
    const { name, description, price, category, ingredients } = request.body
    const image = request.file?.filename
    const { id } = request.params

    const dishRepository = new DishRepository()
    const dishUpdateService = new DishUpdateService(dishRepository)

    const ingredientsArray = await dishUpdateService.handleUpdateIngrdients(
      ingredients
    )
    await dishUpdateService.execute({
      id,
      name,
      description,
      price,
      dish_id: id,
      image,
      category,
    })
    const ingredientsToSave = ingredientsArray.map((ingredient) => {
      return {
        name: ingredient,
        dish_id: id,
      }
    })
    const ingredientRepository = new IngredientRepository()
    await Promise.all(
      ingredientsToSave.map((ingredient) =>
        ingredientRepository.update(ingredient)
      )
    )
    return response.status(201).json()
  }

  async delete(request, response) {
    const { id } = request.params

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
        "dish.image",
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
    const dish = await knex("dish").where({ id }).first()

    if (!dish) {
      return response.status(404).json({ message: "Prato não encontrado" })
    }

    const ingredients = await knex("ingredients")
      .select("name")
      .where("dish_id", id)

    const ingredientNames = ingredients.map((ingredient) => ingredient.name)
    dish.ingredients = ingredientNames

    return response.json(dish)
  }
}

export default DishController
