import { generateMockPets } from "../mocks/petMocker.js";
import { generateMockUsers } from "../mocks/userMocker.js";
import { createHash } from "../utils/index.js";
import { faker } from "@faker-js/faker";

import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

export const getMockingPets = (req, res) => {
  const pets = generateMockPets();
  res.json(pets);
};

export const getMockingUsers = async (req, res) => {
  try {
    const users = await generateMockUsers(50);
    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    console.error("Error al generar usuarios en mock:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error al generar usuarios" });
  }
};

export const generateData = async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  try {
    const hashedPassword = await createHash("coder123");

    const userMocks = Array.from({ length: users }, () => ({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: [],
    }));

    const insertedUsers = await userModel.insertMany(userMocks);

    const petMocks = Array.from({ length: pets }, () => {
      const randomOwner = faker.helpers.arrayElement(insertedUsers);
      const specie = faker.helpers.arrayElement([
        "perro",
        "gato",
        "pajaro",
        "hamster",
      ]);

      let name;
      switch (specie) {
        case "perro":
          name = faker.animal.dog();
          break;
        case "gato":
          name = faker.animal.cat();
          break;
        case "pajaro":
          name = faker.animal.bird();
          break;
        default:
          name = faker.person.firstName();
      }

      return {
        name,
        specie,
        birthDate: faker.date.birthdate({ min: 1, max: 15, mode: "age" }),
        adopted: faker.datatype.boolean(),
        owner: randomOwner._id,
        image: faker.image.urlPicsumPhotos(),
      };
    });

    const insertedPets = await petModel.insertMany(petMocks);

    const updates = insertedPets.map((pet) => ({
      updateOne: {
        filter: { _id: pet.owner },
        update: { $push: { pets: { _id: pet._id } } },
      },
    }));

    await userModel.bulkWrite(updates);

    res.status(201).json({
      status: "success",
      message: `Se generaron ${users} usuarios y ${pets} mascotas`,
      users: insertedUsers.length,
      pets: insertedPets.length,
    });
  } catch (error) {
    console.error("Error al generar datos:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error al generar datos" });
  }
};
