import { test, expect } from "@playwright/test";
import { petTemplate } from "../testData/test-data";

test("Create 4 available pets with different IDs", async ({ request }) => {
  // Arrange
  const baseURL = process.env.BASE_URL;
  if (!baseURL) {
    throw new Error("BASE_URL environment variable is not set");
  }
  const endpoint = `${baseURL}/pet`;
  for (let id = 1; id <= 4; id++) {
    const petData = {
      id: id,
      ...petTemplate,
    };

    // Act
    const response = await request.post(endpoint, {
      data: petData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    // Assert
    expect(response.status()).toBe(200);
  }
});
