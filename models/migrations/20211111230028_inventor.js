exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("inventor", t => {
    t.increments() // auto-incrementing id column
      .index(); // index this column
    t.string("name")
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it
    t.integer("rank")
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index();
  });
};
exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("inventor");
};
