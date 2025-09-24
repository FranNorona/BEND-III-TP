import request from "supertest";
import app from "../src/app.js";
import { expect } from "chai";
import dotenv from "dotenv";

dotenv.config();

const userId = process.env.REAL_ID_USER;
const petId = process.env.REAL_ID_PET;
const fakeId = "64f000000000000000000000";
const invalidId = "no-es-un-id-valido";

let adoptionId;

const recreateAdoption = async () => {
  const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
  expect(res.statusCode).to.equal(200);
  const adoptions = await request(app).get("/api/adoptions");
  const lastAdoption = adoptions.body.payload.at(-1);
  adoptionId = lastAdoption._id;
};

describe("Adoption Router", () => {
  before(async () => {
    await recreateAdoption();
  });

  after(async () => {
    await request(app).delete(`/api/adoptions/${adoptionId}`);
  });

  it("GET /api/adoptions deberia devolver un array", async () => {
    const res = await request(app).get("/api/adoptions");
    expect(res.statusCode).to.equal(200);
    expect(Array.isArray(res.body.payload)).to.equal(true);
  });

  it("POST /api/adoptions deberia fallar si falta data", async () => {
    const res = await request(app).post(
      `/api/adoptions/${userId}/invalidPetId`
    );
    expect(res.statusCode).to.equal(404);
  });

  it("PUT /api/adoptions/:id deberia actualizar una adopcion existente", async () => {
    await recreateAdoption();
    const res = await request(app)
      .put(`/api/adoptions/${adoptionId}`)
      .send({ adopted: true });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("status", "success");
    expect(res.body.payload).to.have.property("_id").that.equals(adoptionId);
  });

  it("PUT /api/adoptions/:id deberia fallar si el id no existe", async () => {
    const res = await request(app)
      .put(`/api/adoptions/${fakeId}`)
      .send({ adopted: true });

    expect(res.statusCode).to.equal(404);
  });

  it("PUT /api/adoptions/:id deberia fallar si el id es invalido", async () => {
    const res = await request(app)
      .put(`/api/adoptions/${invalidId}`)
      .send({ adopted: true });

    expect(res.statusCode).to.equal(400);
  });

  it("DELETE /api/adoptions/:id deberia eliminar una adopcion existente", async () => {
    await recreateAdoption();
    const res = await request(app).delete(`/api/adoptions/${adoptionId}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("message").that.includes("eliminada");
  });

  it("DELETE /api/adoptions/:id deberia fallar si el id no existe", async () => {
    const res = await request(app).delete(`/api/adoptions/${fakeId}`);
    expect(res.statusCode).to.equal(404);
  });

  it("DELETE /api/adoptions/:id deberia fallar si el id es invalido", async () => {
    const res = await request(app).delete(`/api/adoptions/${invalidId}`);
    expect(res.statusCode).to.equal(400);
  });
});
