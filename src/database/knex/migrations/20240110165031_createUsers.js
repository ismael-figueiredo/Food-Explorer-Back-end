import  knex  from 'knex';

export const up = async (knex) => 
  knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("password").notNullable();
    table
      .enum("role", ["admin", "operator", "manager"], {
        useNative: true,
        enumName: "roles",
      })
      .notNullable()
      .defaultTo("operator");
    table.text("avatar");
    table.text("office").defaultTo("Operador");
    table.integer("sector_id").references("id").inTable("sector");
    table.integer("sector_id_2").references("id").inTable("sector");
    table.integer("sector_id_3").references("id").inTable("sector");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

export const down = async (knex) => knex.schema.dropTable("users");
