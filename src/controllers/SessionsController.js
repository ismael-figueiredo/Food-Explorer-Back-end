// Importando o pacote inteiro e, em seguida, usando desestruturação
import bcrypt from "bcryptjs"
const { compare } = bcrypt
import jwt from "jsonwebtoken"
const { sign } = jwt
import authConfig from "../configs/auth.js"
import knex from "../database/knex/index.js"
import AppError from "../utils/AppError.js"

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    if (!email || !password) {
      throw new AppError("Necessário informar email e senha!")
    }

    const user = await knex("users").where({ email }).first()

    if (!user) {
      throw new AppError("Nome e/ou senha incorretos.", 401)
    }
    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("Nome e/ou senha incorretos.", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    })

    return response.json({ user, token })
  }
 
}

export default SessionsController
