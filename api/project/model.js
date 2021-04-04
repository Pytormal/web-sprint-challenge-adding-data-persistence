// build your `Project` model here
const db = require("../../data/dbConfig");

module.exports = {
  getAll,
  findById,
  insert,
  update,
  remove,
};

function getAll() {
  return db("projects");
}

function findById(project_id) {
  return db("projects")
    .where({ project_id: Number(project_id) })
    .first();
}

function insert(project) {
  return db("projects")
    .insert(project, "project_id")
    .then((ids) => ({ project_id: ids[0] }));
}

function update(project_id, project) {
  return db("projects").where("project_id", Number(project_id)).update(project);
}

function remove(project_id) {
  return db("projects").where("project_id", Number(project_id)).del();
}
