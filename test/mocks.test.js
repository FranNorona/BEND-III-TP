import request from "supertest";
import app from "../src/app.js";
import { expect } from "chai";

describe("Mock Router", () => {
  it("GET /api/mocks/mockingusers debería devolver un array de usuarios simulados", async () => {
    const res = await request(app).get("/api/mocks/mockingusers");
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload).to.be.an("array");
    expect(res.body.payload.length).to.be.greaterThan(0);
    expect(res.body.payload[0]).to.have.property("first_name");
    expect(res.body.payload[0]).to.have.property("email");
  });

  it("GET /api/mocks/mockingpets debería devolver un array de mascotas simuladas", async () => {
    const res = await request(app).get("/api/mocks/mockingpets");
    expect(res.statusCode).to.equal(200);
    expect(res.body.payload).to.be.an("array");
    expect(res.body.payload.length).to.be.greaterThan(0);
    expect(res.body.payload[0]).to.have.property("name");
    expect(res.body.payload[0]).to.have.property("species");
  });

  it("POST /api/mocks/generateData debería generar e insertar usuarios en la base", async () => {
    const res = await request(app)
      .post("/api/mocks/generateData")
      .send({ users: 5, pets: 5 });

    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.include("Se generaron");
  });

  it("POST /api/mocks/generateData debería fallar si el parámetro 'count' es inválido", async () => {
    const res = await request(app)
      .post("/api/mocks/generateData")
      .send({ count: -3 });

    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property("error");
  });
});
