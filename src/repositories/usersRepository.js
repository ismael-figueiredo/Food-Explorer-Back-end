import knex from "../database/knex/index.js"

class UsersRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first()
    return user
  }

  async create({ name, email, password }) {
    const userId = await knex("users").insert({
      name,
      email,
      password,
    })
    return { id: userId }
  }
}

export default UsersRepository
