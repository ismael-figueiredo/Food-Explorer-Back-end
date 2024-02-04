import DishRepository from "../repositories/dishRepository.js"
import DishCreateService from "../services/dishCreateService.js"
import AppError from "../utils/AppError.js"


class DishController {
  async create(request, response) {
    const { name, description, price, category } = request.body
    const {id:user_id} = request.user
   
    const filename = request.file.filename
    if (!name || !price || !category || !description) {
      throw new AppError("Preencha todos os campos!.", 400)
    }
  
    const dishRepository = new DishRepository()

    if (!filename) {
      throw new AppError("Imagem não definida!", 400)
    }
    
    const dishCreateService = new DishCreateService(dishRepository)
    await dishCreateService.execute({
      name,
      description,
      price,
      user_id,
      image: filename,
      category,
    })

    

    return response.status(201).json()
  }
  
}

export default DishController
