import { APIRequestContext, APIResponse } from "@playwright/test";
import { orderTemplate } from "../testData/test-data";

export class OrderService {
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
    this.endpoint = `${this.baseURL}/store/order`;
  }

  async createOrder(id: number, petId: number): Promise<APIResponse> {
    const orderData = {
      id: id,
      petId: petId,
      ...orderTemplate,
    };

    return await this.request.post(this.endpoint, {
      data: orderData,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async createOrdersForPetIds(petIds: number[]): Promise<number[]> {
    const createdOrderIds: number[] = [];
    const minId = Math.min(...petIds);
    const maxId = Math.max(...petIds);

    for (let id = minId; id <= maxId; id++) {
      const response = await this.createOrder(id, id);
      if (response.status() === 200) {
        createdOrderIds.push(id);
      }
    }

    return createdOrderIds;
  }

  async getOrder(orderId: number): Promise<APIResponse> {
    return await this.request.get(`${this.endpoint}/${orderId}`);
  }

  async deleteOrder(orderId: number): Promise<APIResponse> {
    return await this.request.delete(`${this.endpoint}/${orderId}`, {
      headers: {
        api_key: this.apiKey,
      },
    });
  }
}

