const express = require("express");
const config = require("../config");
const knex = require("knex")(config.db);

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/api/idea", (request, response) => {
    let ideaResponse;
    if (!isNaN(request.query.limit)) {
      ideaResponse = knex("idea")
        .join("inventor", "inventor.id", "idea.inventor_id")
        .select({
          id: "idea.id",
          ideaName: "idea.name",
          ideaDetail: "idea.detail",
          inventor: "inventor.name"
        })
        .limit(Number(request.query.limit))
        .then(ideas => {
          response.send(ideas);
        });
    } else {
      ideaResponse = knex("idea")
        .join("inventor", "inventor.id", "idea.inventor_id")
        .select({
          id: "idea.id",
          ideaName: "idea.name",
          ideaDetail: "idea.detail",
          inventor: "inventor.name",
          price: "idea.price"
        })
        .then(idea => {
          response.send(idea);
        });
    }
  });

  app.post("/api/idea", (request, response) => {
    const { ideaName, ideaDetail, inventorId, price } = request.body;
    let putIdea = {};

    if (inventorId !== null || inventorID !== undefined) {
      putIdea.inventor_id = inventorId;
    } else {
      res.status(400).end();
    }

    if (ideaName !== undefined && ideaName !== null) {
      putIdea.name = ideaName;
    } else {
      res.status(400).end();
    }

    if (ideaDetail !== undefined || ideaDetail !== null) {
      putIdea.detail = ideaDetail;
    }

    if (price !== undefined || price !== null) {
      putIdea.price = price;
    }

    knex("idea")
      .insert(putIdea)
      .then(() =>
        knex("idea")
          .join("inventor", "inventor.id", "idea.inventor_id")
          .where({ "idea.inventor_id": inventorId })
          .select()
      )
      .then(idea => response.send(idea))
      .catch(err => {
        Promise.reject(err);
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          res
            .status(400)
            .send(err)
            .end();
      });
  });

  app.patch("/api/idea/:idOrName", (request, response) => {
    let ideaResponse;

    const { ideaName, ideaDetail, price } = request.body;
    let putIdea = {};

    if (ideaName !== undefined && ideaName !== null) {
      putIdea.name = ideaName;
    }
    if (ideaDetail !== undefined || ideaDetail !== null) {
      putIdea.detail = ideaDetail;
    }
    if (price !== undefined || price !== null) {
      putIdea.price = price;
    }

    if (putIdea === {}) {
      res.status(400).end();
    }
    const idOrName = request.params.idOrName;
    if (!isNaN(idOrName)) {
      ideaResponse = knex("idea")
        .update(putIdea)
        .where({ "idea.id": Number(idOrName) })
        .then(() => response.status(200).end());
    } else {
      ideaResponse = knex("idea")
        .update(putIdea)
        .where({ "idea.name": idOrName })
        .then(() => response.status(200).end());
    }
  });

  app.delete("/api/idea/:idOrName", (request, response) => {
    let ideaResponse;
    const idOrName = request.params.idOrName;
    if (!isNaN(idOrName)) {
      ideaResponse = knex("idea")
        .delete()
        .where({ "idea.id": Number(idOrName) })
        .then(() => response.status(200).end());
    } else {
      ideaResponse = knex("idea")
        .delete()
        .where({ "idea.name": idOrName })
        .then(() => response.status(200).end());
    }
  });
  return app;
};

module.exports = { setupServer };
