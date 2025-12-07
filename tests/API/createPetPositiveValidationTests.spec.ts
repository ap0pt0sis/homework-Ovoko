import { test, expect } from "@playwright/test";
import { PetService } from "../services/petService";

test("Create 4 Available Pets", async ({ request }) => {
  // Arrange
  const petService = new PetService(request);
  const petIds = [1, 2, 3, 4];

  // Act
  const createdPetIds = await petService.createPets(petIds);
  
  // Assert
  expect(createdPetIds).toHaveLength(4);
  for (const petId of createdPetIds) {
    const getResponse = await petService.getPet(petId);
    expect(getResponse.status()).toBe(200);
    const pet = await getResponse.json();
    expect(pet.status).toBe("available");
  }
});
