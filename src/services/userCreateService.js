import AppError from "../utils/AppError.js";
class UserCreateService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute({ name, email, password }) {
      if (!name || !email || !password) { 
        throw new AppError("Preencha todos os campos!", 400);
      }
  
      const hashedPassword = await hash(password, 8);
  
      const checkUserExists = await this.userRepository.findByName(email);
      if (checkUserExists) {
        throw new AppError("Este e-mail já está em uso.", 400);
      }
  
      const userCreated = await this.userRepository.create({ 
        name,
        password: hashedPassword,
        email
      });
  
      return userCreated;
    }
  }
  

export default UserCreateService