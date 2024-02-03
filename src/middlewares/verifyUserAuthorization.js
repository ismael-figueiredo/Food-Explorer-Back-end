import AppError from "../utils/AppError.js"

function verifyUserAuthorization(roleToVerify){
  return (request, response, next) => {
    const {role} = request.user
    if(!roleToVerify.includes(role)) {
      throw new AppError("Unauthorized", 401)
    }

    return next()
  }
}

export default verifyUserAuthorization