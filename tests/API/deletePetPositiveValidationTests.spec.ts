import { test, expect } from "@playwright/test";
import { PetService } from "../services/petService";

test("Delete multiple pets", async ({ request }) => {
  // Arrange
  const petService = new PetService(request);
  const petIds = [5, 6, 7, 8];
  const createdPetIds = await petService.createPets(petIds);

  // Act
  for (const petId of createdPetIds) {
    await petService.deletePet(petId);
  }

  // Assert
  for (const petId of createdPetIds) {
    const getResponse = await petService.getPet(petId);
    expect(getResponse.status()).toBe(404);
  }
});
