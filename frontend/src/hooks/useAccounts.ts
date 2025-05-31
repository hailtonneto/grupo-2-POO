import { useState, useEffect } from "react"
import { accountService } from "../services/accountService"
import type { Account } from "../types"

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await accountService.getAccounts()
      setAccounts(data)
    } catch (error: any) {
      setError("Erro ao buscar contas")
    } finally {
      setLoading(false)
    }
  }

  const getBalance = async (accountId: number): Promise<number> => {
    try {
      const data = await accountService.getBalance(accountId)
      return data.balance
    } catch (error: any) {
      throw error
    }
  }

  const refreshAccounts = () => {
    fetchAccounts()
  }

  return {
    accounts,
    loading,
    error,
    getBalance,
    refreshAccounts
  }
}