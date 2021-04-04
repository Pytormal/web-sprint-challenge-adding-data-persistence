exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments("project_id");
      tbl.string("project_name", 128).notNullable().unique();
      tbl.text("project_description", 1000).notNullable();
      tbl.boolean("project_completed").notNullable();
    })
    .createTable("resources", (tbl) => {
      tbl.increments("resource_id");
      tbl.string("resource_name").notNullable().unique();
      tbl.text("resource_description", 1000).notNullable();
    })
    .createTable("tasks", (tbl) => {
      tbl.increments("task_id");
      tbl.text("task_description", 1000).notNullable();
      tbl.text("task_notes", 1000).notNullable();
      tbl.boolean("task_completed").notNullable();
      tbl
        .bigint("project_id")
        .unsigned()
        .references("project_id")
        .inTable("projects");
    })
    .createTable("project_resources", (tbl) => {
      tbl.increments();
      tbl
        .bigint("project_name")
        .unsigned()
        .references("project_name")
        .inTable("projects");
      tbl
        .bigint("resource_id")
        .unsigned()
        .references("resource_id")
        .inTable("resources");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
