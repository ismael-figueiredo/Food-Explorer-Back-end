
export const up = async (knex) => 
  knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("email").notNullable();
    table.text("password").notNullable();
    table
      .enum("role", ["admin", "client"], {
        useNative: true,
        enumName: "roles",
      })
      .notNullable()
      .defaultTo("client");
    table.text("avatar");
    table.text("name");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

export const down = async (knex) => knex.schema.dropTable("users");
