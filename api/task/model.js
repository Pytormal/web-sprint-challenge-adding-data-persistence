// build your `Task` model here
const db = require("../../data/dbConfig");

module.exports = {
  getAll,
  findById,
  insert,
  update,
  remove,
};

function getAll() {
  return db("tasks as t")
    .leftJoin("projects as p", "p.project_id", 't.task_id')
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    );
}

function findById(task_id) {
  return db("tasks")
    .where({ task_id: Number(task_id) })
    .first();
}

function insert(task) {
  return db("tasks")
    .insert(task, "task_id")
    .then((ids) => ({ task_id: ids[0] }));
}

function update(task_id, task) {
  return db("tasks")
    .where("task_id", Number(task_id))
    .update(task);
}

function remove(task_id) {
  return db("tasks").where("task_id", Number(task_id)).del();
}