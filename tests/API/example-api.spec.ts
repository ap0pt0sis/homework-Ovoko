import { test, expect } from "@playwright/test";
//import { ApiClient } from "../utils/api-client";

// test.describe("API Tests", () => {
//   let apiClient: ApiClient;

//   test.beforeAll(async ({ request }) => {
//     apiClient = new ApiClient(request);
//   });

//   test("GET request - fetch users", async () => {
//     const response = await apiClient.get("/api/users");
    
//     expect(response.status()).toBe(200);
//     const users = await response.json();
//     expect(Array.isArray(users)).toBeTruthy();
//   });

//   test("POST request - create user", async () => {
//     const userData = {
//       name: "John Doe",
//       email: "john@example.com",
//     };

//     const response = await apiClient.post("/api/users", userData);
    
//     expect(response.status()).toBe(201);
//     const createdUser = await response.json();
//     expect(createdUser.name).toBe(userData.name);
//     expect(createdUser.email).toBe(userData.email);
//   });

//   test("PUT request - update user", async () => {
//     const userId = 1;
//     const updateData = {
//       name: "Jane Doe",
//     };

//     const response = await apiClient.put(`/api/users/${userId}`, updateData);
    
//     expect(response.status()).toBe(200);
//     const updatedUser = await response.json();
//     expect(updatedUser.name).toBe(updateData.name);
//   });

//   test("DELETE request - delete user", async () => {
//     const userId = 1;
//     const response = await apiClient.delete(`/api/users/${userId}`);
    
//     expect(response.status()).toBe(204);
//   });
// });


