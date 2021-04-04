exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments("project_id");
      tbl.string("project_name", 128).notNullable().unique();
      tbl.text("project_description", 1000);
      tbl.boolean("project_completed").default(false);
    })
    .createTable("resources", (tbl) => {
      tbl.increments("resource_id");
      tbl.string("resource_name").notNullable().unique();
      tbl.text("resource_description", 1000);
    })
    .createTable("tasks", (tbl) => {
      tbl.increments("task_id");
      tbl.text("task_description", 1000).notNullable();
      tbl.text("task_notes", 1000);
      tbl.boolean("task_completed").default(false);
      // tbl
      //   .bigint("project_id").notNullable()
      //   .unsigned()
      //   .references("project_id")
      //   .inTable("projects")
      //   .notNullable()
      //   .onDelete("CASCADE")
      //   .onUpdate("CASCADE");

        tbl
          .bigint("project_name")
          .unsigned()
          .references("projects.project_name")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        tbl
          .foreign("project_name")
          .references("projects.project_name")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
    })

    .createTable("project_resources", (tbl) => {
      tbl.increments();
      tbl
        .bigint("project_name")
        .unsigned()
        .references("project_name")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .bigint("resource_id")
        .unsigned()
        .references("resource_id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
