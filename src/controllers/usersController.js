import UsersRepository from "../repositories/usersRepository.js"
import UserCreateService from "../services/userCreateService.js"

class UsersController {
  async create(request, response) {
    console.log("usercontroler")
    const { name, email, password } = request.body
    const userRepository = new UsersRepository()
    const userCreateService = new UserCreateService(userRepository)
    await userCreateService.execute({ name, email, password })
    console.log("usercontroler")
    return response.status(201).json()
  }}

    export default UsersController