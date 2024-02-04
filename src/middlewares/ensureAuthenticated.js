import jwt from "jsonwebtoken"
const { verify } = jwt

import AppError from "../utils/AppError.js"
import authconfig from "../configs/auth.js"

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("JWT Tokem não informado", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { role, sub: user_id } = verify(token, authconfig.jwt.secret)

    request.user = {
      id: Number(user_id),
      role,
    }

    return next()
  } catch {
    throw new AppError("JWT Tokem invalido", 401)
  }
}
export default ensureAuthenticated
