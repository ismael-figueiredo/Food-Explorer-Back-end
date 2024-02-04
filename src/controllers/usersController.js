import UsersRepository from "../repositories/usersRepository.js"
import UserCreateService from "../services/userCreateService.js"
import AppError from "../utils/AppError.js"

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body
    if (!name || !email || !password) {
      throw new AppError("Campos nome, e-mail ou senha não fornecidos.", 400)
    }


    const userRepository = new UsersRepository()
    const userCreateService = new UserCreateService(userRepository)
    await userCreateService.execute({ name, email, password })

    return response.status(201).json()
  }
}

export default UsersController
