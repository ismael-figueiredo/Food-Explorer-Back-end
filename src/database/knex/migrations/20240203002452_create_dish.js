export const up = async (knex) =>
  knex.schema.createTable("dish", (table) => {
    table.increments("id")
    table.text("name").notNullable()
    table.text("image")
    table.text("price")
    table.text("description")
    table
      .enum("category", ["meals", "desserts", "drinks"], {
        useNative: true,
        enumName: "categories",
      })
      .notNullable()
      .defaultTo("meals")
    table.integer("user_id").references("id").inTable("users").notNullable()
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
  })

export const down = async (knex) => knex.schema.dropTable("dish")
