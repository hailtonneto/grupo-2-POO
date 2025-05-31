import axios from "axios"

const API_BASE_URL = "http://10.0.2.2:8080/api"

class ApiService {
  private api

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  async get(endpoint: string) {
    const response = await this.api.get(endpoint)
    return response.data
  }

  async post(endpoint: string, data: any) {
    const response = await this.api.post(endpoint, data)
    return response.data
  }

  async put(endpoint: string, data: any) {
    const response = await this.api.put(endpoint, data)
    return response.data
  }

  async delete(endpoint: string) {
    const response = await this.api.delete(endpoint)
    return response.data
  }
}

export const apiService = new ApiService()