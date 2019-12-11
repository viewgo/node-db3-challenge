const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  /*SELECT s.id, sc.scheme_name, s.step_number, s.instructions
    FROM steps as s

    JOIN schemes as sc
    ON sc.id = s.scheme_id
    
    WHERE scheme_id = 1*/
  console.log(id);

  return db("steps as s")
    .select("s.id", "sc.scheme_name", "s.step_number", "s.instructions")
    .join("schemes as sc", "sc.id", "s.scheme_id")
    .where("scheme_id", id);
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  console.log(changes);
  changedObject = { id: id, ...changes };
  console.log(changedObject);
  return db("schemes")
    .update("scheme_name", changes.scheme_name)
    .where({ id })
    .then(count => {
      return findById(id);
    });
}

function remove(id) {
  const deleted = findById(id).then(obj => {
    return obj;
  });

  return db("schemes")
    .where({ id })
    .del()
    .then(count => {
      return deleted;
    });
}
