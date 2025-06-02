import { useState, useEffect } from "react"
import { cardService } from "../services/cardService"
import type { Card } from "../types"

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await cardService.getCards()
      setCards(data)
    } catch (error: any) {
      setError("Erro ao buscar cartões")
    } finally {
      setLoading(false)
    }
  }

  const blockCard = async (cardId: number) => {
    try {
      const result = await cardService.blockCard(cardId)
      setCards(cards.map(card => 
        card.id === cardId ? { ...card, isActive: false } : card
      ))
      return result
    } catch (error: any) {
      throw error
    }
  }

  const refreshCards = () => {
    fetchCards()
  }

  return {
    cards,
    loading,
    error,
    blockCard,
    refreshCards
  }
}