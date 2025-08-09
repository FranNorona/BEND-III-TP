import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";

export const generateMockUsers = async (count = 50) => {
  const users = [];
  const hashedPassword = await createHash("coder123");

  for (let i = 0; i < count; i++) {
    users.push({
      _id: faker.database.mongodbObjectId,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElements(["users", "admin"]),
      pets: [],
    });
  }

  return users;
};
