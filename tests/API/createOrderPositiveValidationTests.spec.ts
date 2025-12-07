import { test, expect } from "@playwright/test";
import { PetService } from "../services/petService";
import { OrderService } from "../services/orderService";

test("Create Orders for 4 Pets", async ({ request }) => {
  // Arrange
  const petService = new PetService(request);
  const orderService = new OrderService(request);
  const petIds = [1, 2, 3, 4];
  const createdPetIds = await petService.createPets(petIds);
  expect(createdPetIds).toHaveLength(4);

  // Act
  const createdOrderIds = await orderService.createOrdersForPetIds(createdPetIds);
  
  // Assert
  expect(createdOrderIds).toHaveLength(4);
  for (const orderId of createdOrderIds) {
    const getResponse = await orderService.getOrder(orderId);
    expect(getResponse.status()).toBe(200);
  }
});

