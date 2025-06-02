export interface User {
  id: number
  name: string
  email: string
  cpf: string
  phone: string
}

export interface Account {
  id: number
  accountNumber: string
  balance: number
  accountType: string
  userId: number
}

export interface Transaction {
  id: number
  amount: number
  type: string
  description: string
  createdAt: string
}

export interface Card {
  id: number
  cardNumber: string
  cardType: string
  expiryDate: string
  isActive: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
  accounts: Account[]
}