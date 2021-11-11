const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();
const cleanDB = require("../models/seeds/prepare_data.js");
/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer();

describe("Idea API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });
  afterEach(() => {});

  describe("GET /api/idea", () => {
    it("should get all idea", async () => {
      const response = await request.get("/api/idea");
      response.should.be.json;
      JSON.parse(response.text).length.should.equal(20);
    });

    it("should get idea limit = n", async () => {
      const response = await request.get("/api/idea").query({ limit: 5 });
      response.should.be.json;
      JSON.parse(response.text).length.should.equal(5);
    });
  });

  describe("POST /api/idea/", () => {
    it("should add idea", async () => {
      const body = {
        ideaName: "XX",
        ideaDetail: "XXX",
        inventorId: 3,
        price: 200
      };
      const response = await request.post("/api/idea").send(body);
      response.should.be.json;
      JSON.parse(response.text)[0].inventor_id.should.equal(body.inventorId);
      const response2 = await request.get("/api/idea");
      response2.should.be.json;
      JSON.parse(response2.text).length.should.equal(21);
    });
  });

  describe("PATCH /api/idea/:idOrName", () => {
    it("should change idea", async () => {
      const response = await request.patch("/api/idea/273");
      response.should.be.json;
      const response2 = await request.get("/api/idea");
      response2.should.be.json;
      JSON.parse(response2.text).length.should.equal(21);
    });
  });

  describe("DELETE /api/idea/:idOrName", () => {
    it("should delete idea by id", async () => {
      const response = await request.delete("/api/idea/265");
      response.should.be.json;
      const response2 = await request.get("/api/idea");
      response2.should.be.json;
      JSON.parse(response2.text).length.should.equal(20);
    });
  });
});
