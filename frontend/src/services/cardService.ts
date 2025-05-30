import { apiService } from "./api"

class CardService {
  async getCards() {
    try {
      const response = await apiService.get("/cards")
      return response
    } catch (error: any) {
      throw new Error("Erro ao buscar cartões")
    }
  }

  async blockCard(cardId: number) {
    try {
      const response = await apiService.put(`/cards/${cardId}/block`, {})
      return response
    } catch (error: any) {
      throw new Error("Erro ao bloquear cartão")
    }
  }
}

export const cardService = new CardService()