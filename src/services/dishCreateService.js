import AppError from "../utils/AppError.js"

class DishCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    const hashedPassword = await hash(password, 8)

    const checkUserExists = await this.userRepository.findByEmail(email)
    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.", 400)
    }

    const userCreated = await this.userRepository.create({
      name,
      password: hashedPassword,
      email,
    })

    return userCreated
  }
}

export default DishCreateService
