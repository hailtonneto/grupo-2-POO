import { apiService } from "./api"

class AccountService {
  async getAccounts() {
    try {
      const response = await apiService.get("/accounts")
      return response
    } catch (error: any) {
      throw new Error("Erro ao buscar contas")
    }
  }

  async getBalance(accountId: number) {
    try {
      const response = await apiService.get(`/accounts/${accountId}/balance`)
      return response
    } catch (error: any) {
      throw new Error("Erro ao buscar saldo")
    }
  }
}

export const accountService = new AccountService()