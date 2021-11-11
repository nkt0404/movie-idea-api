exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("idea")
    .del()
    .then(function() {
      return knex("inventor")
        .del()
        .then(function() {
          // Inserts seed entries
          return knex("inventor").insert([
            { id: 1, name: "発案者1", rank: 1 },
            { id: 2, name: "発案者2", rank: 2 },
            { id: 3, name: "発案者3", rank: 3 },
            { id: 4, name: "発案者4", rank: 4 },
            { id: 5, name: "発案者5", rank: 5 },
            { id: 6, name: "発案者6", rank: 6 },
            { id: 7, name: "発案者7", rank: 7 },
            { id: 8, name: "発案者8", rank: 8 },
            { id: 9, name: "発案者9", rank: 9 },
            { id: 10, name: "発案者10", rank: 10 }
          ]);
        })
        .then(function() {
          // Inserts seed entries
          return knex("idea").insert([
            { name: "案1", detail: "案1の詳細", inventor_id: 1, price: 10000 },
            { name: "案2", detail: "案2の詳細", inventor_id: 1, price: 20000 },
            { name: "案3", detail: "案3の詳細", inventor_id: 2, price: 20000 },
            { name: "案4", detail: "案4の詳細", inventor_id: 2, price: 30000 },
            { name: "案5", detail: "案5の詳細", inventor_id: 3, price: 40000 },
            { name: "案6", detail: "案6の詳細", inventor_id: 3, price: 10000 },
            { name: "案7", detail: "案7の詳細", inventor_id: 3, price: 10000 },
            { name: "案8", detail: "案8の詳細", inventor_id: 4, price: 10000 },
            { name: "案9", detail: "案9の詳細", inventor_id: 5, price: 10000 },
            {
              name: "案10",
              detail: "案10の詳細",
              inventor_id: 6,
              price: 50000
            },
            {
              name: "案11",
              detail: "案11の詳細",
              inventor_id: 7,
              price: 50000
            },
            {
              name: "案12",
              detail: "案12の詳細",
              inventor_id: 8,
              price: 50000
            },
            {
              name: "案13",
              detail: "案13の詳細",
              inventor_id: 9,
              price: 50000
            },
            {
              name: "案14",
              detail: "案14の詳細",
              inventor_id: 10,
              price: 50000
            },
            {
              name: "案15",
              detail: "案15の詳細",
              inventor_id: 3,
              price: 40000
            },
            {
              name: "案16",
              detail: "案16の詳細",
              inventor_id: 1,
              price: 10000
            },
            {
              name: "案17",
              detail: "案17の詳細",
              inventor_id: 7,
              price: 10000
            },
            {
              name: "案18",
              detail: "案18の詳細",
              inventor_id: 2,
              price: 10000
            },
            {
              name: "案19",
              detail: "案19の詳細",
              inventor_id: 5,
              price: 10000
            },
            { name: "案20", detail: "案20の詳細", inventor_id: 6, price: 50000 }
          ]);
        });
    });
};
