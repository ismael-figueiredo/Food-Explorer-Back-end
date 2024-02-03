export const up = async (knex) =>
  knex.schema.createTable("dish", (table) => {
    table.increments("id")

    table.text("name")
    table.text("dish_image")
    table.integer("user_id").references("id").inTable("users")
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
  })

export const down = async (knex) => knex.schema.dropTable("dish")
