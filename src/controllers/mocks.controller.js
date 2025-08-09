import { generateMockPets } from "../mocks/petMocker";
import { generateMockUsers } from "../mocks/userMocker";

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
