import UsersRepository from "../repositories/usersRepository.js"
import UserCreateService from "../services/userCreateService.js"

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userRepository = new UsersRepository()
    const userCreateService = new UserCreateService(userRepository)
    await userCreateService.execute({ name, email, password })

    return response.status(201).json()
  }
}

export default UsersController
