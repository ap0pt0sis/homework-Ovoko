import { test, expect } from "@playwright/test";
import { PetService } from "../services/petService";
import { OrderService } from "../services/orderService";

test("Delete multiple orders", async ({ request }) => {
  // Arrange
  const petService = new PetService(request);
  const orderService = new OrderService(request);
  const petIds = [5, 6, 7, 8];
  const createdPetIds = await petService.createPets(petIds);
  const createdOrderIds = await orderService.createOrdersForPetIds(createdPetIds);

  // Act
  for (const orderId of createdOrderIds) {
    await orderService.deleteOrder(orderId);
  }

  // Assert
  for (const orderId of createdOrderIds) {
    const getResponse = await orderService.getOrder(orderId);
    expect(getResponse.status()).toBe(404);
  }
});
