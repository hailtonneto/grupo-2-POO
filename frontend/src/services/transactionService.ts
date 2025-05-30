import { apiService } from "./api"

class TransactionService {
  async deposit(data: { accountId: number; amount: number; description?: string }) {
    try {
      const response = await apiService.post("/transactions/deposit", data)
      return response
    } catch (error: any) {
      throw new Error("Erro ao fazer depósito")
    }
  }

  async withdraw(data: { accountId: number; amount: number; description?: string }) {
    try {
      const response = await apiService.post("/transactions/withdraw", data)
      return response
    } catch (error: any) {
      throw new Error("Erro ao fazer saque")
    }
  }

  async transfer(data: { fromAccountId: number; toAccountNumber: string; amount: number; description?: string }) {
    try {
      const response = await apiService.post("/transactions/transfer", data)
      return response
    } catch (error: any) {
      throw new Error("Erro ao fazer transferência")
    }
  }

  async getHistory(accountId: number) {
    try {
      const response = await apiService.get(`/transactions/history/${accountId}`)
      return response
    } catch (error: any) {
      throw new Error("Erro ao buscar histórico")
    }
  }
}

export const transactionService = new TransactionService()