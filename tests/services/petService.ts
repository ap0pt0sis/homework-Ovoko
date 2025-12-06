import { APIRequestContext, APIResponse } from "@playwright/test";
import { petTemplate } from "../testData/test-data";

export class PetService {
  private request: APIRequestContext;
  private baseURL: string;
  private endpoint: string;
  private apiKey: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = process.env.BASE_URL || "";
    if (!this.baseURL) {
      throw new Error("BASE_URL environment variable is not set");
    }
    this.apiKey = process.env.API_KEY || "";
    if (!this.apiKey) {
      throw new Error("API_KEY environment variable is not set");
    }
    this.endpoint = `${this.baseURL}/pet`;
  }

  async createPet(id: number): Promise<APIResponse> {
    const petData = {
      id: id,
      ...petTemplate,
    };

    return await this.request.post(this.endpoint, {
      data: petData,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async createPets(ids: number[]): Promise<number[]> {
    const createdPetIds: number[] = [];

    for (const id of ids) {
      const response = await this.createPet(id);
      if (response.status() === 200) {
        createdPetIds.push(id);
      }
    }

    return createdPetIds;
  }

  async getPet(petId: number): Promise<APIResponse> {
    return await this.request.get(`${this.endpoint}/${petId}`);
  }

  async deletePet(petId: number): Promise<APIResponse> {
    return await this.request.delete(`${this.endpoint}/${petId}`, {
      headers: {
        api_key: this.apiKey,
      },
    });
  }
}

