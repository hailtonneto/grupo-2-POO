"use client"

import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native"
import { RefreshCw } from "lucide-react-native"
import { useState, useEffect } from "react"

const InvestSaldo = ({ user, accounts = [] }) => {
  const [isBalanceVisible, setBalanceVisible] = useState(false)
  const [investmentBalance, setInvestmentBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    calculateInvestmentBalance()
  }, [accounts])

  const calculateInvestmentBalance = () => {
    if (!accounts || accounts.length === 0) {
      setInvestmentBalance(0)
      return
    }

    // Simular saldo de investimentos baseado no saldo total das contas
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
    // Simular que 15% do saldo total está em investimentos
    const investBalance = totalBalance * 0.15
    setInvestmentBalance(investBalance)
  }

  const handleRefresh = async () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para atualizar os investimentos")
      return
    }

    setLoading(true)
    console.log("Atualizando saldo de investimentos...")

    // Simular carregamento
    setTimeout(() => {
      calculateInvestmentBalance()
      setLoading(false)
      Alert.alert("Sucesso", "Saldo de investimentos atualizado!")
    }, 1500)
  }

  const handleAccessWallet = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para acessar a carteira")
      return
    }

    console.log("Acessando carteira de investimentos...")
    Alert.alert(
      "Carteira de Investimentos",
      `Bem-vindo, ${user.name}!\n\nSaldo total: R$ ${investmentBalance.toFixed(2).replace(".", ",")}\n\nRendimento mensal: +2,5%\nRendimento anual: +12,8%`,
    )
  }

  return (
    <View style={styles.box}>
      <View style={styles.topRow}>
        <Text style={styles.balance}>
          {loading
            ? "Carregando..."
            : isBalanceVisible
              ? `R$ ${investmentBalance.toFixed(2).replace(".", ",")}`
              : "R$ ••••"}
        </Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={handleRefresh} disabled={loading}>
            <RefreshCw color="#0EA5E9" size={20} style={{ opacity: loading ? 0.5 : 1 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBalanceVisible((prev) => !prev)}>
            <Image
              source={isBalanceVisible ? require("../assets/home/blocked-eye.png") : require("../assets/home/eye.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleAccessWallet}>
        <Text style={styles.link}>Acessar carteira</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#0EA5E9",
    borderRadius: 12,
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  balance: {
    color: "#0EA5E9",
    fontFamily: "InterBold",
    fontSize: 20,
  },
  icons: {
    flexDirection: "row",
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  link: {
    color: "#0EA5E9",
    fontFamily: "InterBold",
  },
})

export default InvestSaldo
