import { faker } from "@faker-js/faker";

export const generateMockPets = (count = 100) => {
  const pets = [];

  for (let i = 0; i < count; i++) {
    pets.push({
      _id: faker.database.mongodbObjectId(),
      name: faker.word.noun(),
      species: faker.helpers.arrayElement([
        "perro",
        "gato",
        "pájaro",
        "hamster",
      ]),
      age: faker.datatype.number({ min: 1, max: 15 }),
      adopted: faker.datatype.boolean(),
    });
  }

  return pets;
};
