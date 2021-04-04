// build your `Resource` model here
const db = require("../../data/dbConfig");

module.exports = {
  getAll,
  findById,
  insert,
  update,
  remove,
};

function getAll() {
  return db("resources");
}

function findById(resource_id) {
  return db("resources")
    .where({ resource_id: Number(resource_id) })
    .first();
}

function insert(resource) {
  return db("resources")
    .insert(resource, "resource_id")
    .then((ids) => ({ resource_id: ids[0] }));
}

function update(resource_id, resource) {
  return db("resources").where("resource_id", Number(resource_id)).update(resource);
}

function remove(resource_id) {
  return db("resources").where("resource_id", Number(resource_id)).del();
}