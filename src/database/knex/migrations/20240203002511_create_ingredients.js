export const up = async (knex) =>
  knex.schema.createTable("ingredients", (table) => {
    table.increments("id")
    table.text("name")
    table
      .integer("dish_id")
      .references("id")
      .inTable("dish")
      .onDelete("CASCADE")
  })

export const down = async (knex) => knex.schema.dropTable("ingredients")
