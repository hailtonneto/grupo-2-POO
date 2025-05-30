import { useState } from "react"
import { transactionService } from "../services/transactionService"
import type { Transaction } from "../types"

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getHistory = async (accountId: number) => {
    try {
      setLoading(true)
      setError(null)
      const data = await transactionService.getHistory(accountId)
      setTransactions(data)
      return data
    } catch (error: any) {
      setError("Erro ao buscar histórico")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deposit = async (data: { accountId: number; amount: number; description?: string }) => {
    try {
      setLoading(true)
      setError(null)
      const result = await transactionService.deposit(data)
      return result
    } catch (error: any) {
      setError("Erro ao fazer depósito")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const withdraw = async (data: { accountId: number; amount: number; description?: string }) => {
    try {
      setLoading(true)
      setError(null)
      const result = await transactionService.withdraw(data)
      return result
    } catch (error: any) {
      setError("Erro ao fazer saque")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const transfer = async (data: { fromAccountId: number; toAccountNumber: string; amount: number; description?: string }) => {
    try {
      setLoading(true)
      setError(null)
      const result = await transactionService.transfer(data)
      return result
    } catch (error: any) {
      setError("Erro ao fazer transferência")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    transactions,
    loading,
    error,
    getHistory,
    deposit,
    withdraw,
    transfer
  }
}