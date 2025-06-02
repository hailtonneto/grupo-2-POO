"use client"

import { View, StyleSheet, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Header from "../components/Header"
import InvestSaldo from "../components/InvestSaldo"
import PixFeatureGrid from "../components/FeatureGrid"
import { Dimensions } from "react-native"
import { useAuth } from "../src/hooks/useAuth"
import { useAccounts } from "../src/hooks/useAccounts"

const InvestScreen = () => {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get("window").width
  const { user } = useAuth()
  const { accounts } = useAccounts()

  const handleSearch = () => {
    console.log("Abrindo pesquisa de investimentos...")
    Alert.alert("Pesquisar", "Funcionalidade de pesquisa de investimentos será implementada em breve!")
  }

  const handleSettings = () => {
    console.log("Abrindo configurações de investimentos...")
    Alert.alert("Configurações", "Configurações de investimentos serão implementadas em breve!")
  }

  const handleBrazilStocks = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para investir")
      return
    }
    console.log("Abrindo ações do Brasil...")
    Alert.alert("Ações Brasil", "Investimentos em ações brasileiras serão implementados em breve!")
  }

  const handleTreasury = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para investir")
      return
    }
    console.log("Abrindo Tesouro Direto...")
    Alert.alert("Tesouro Direto", "Investimentos no Tesouro Direto serão implementados em breve!")
  }

  const handleCrypto = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para investir")
      return
    }
    console.log("Abrindo criptomoedas...")
    Alert.alert("Criptomoedas", "Investimentos em criptomoedas serão implementados em breve!")
  }

  const handleDollarInvest = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para investir")
      return
    }
    console.log("Abrindo investimentos em dólar...")
    Alert.alert("Investimentos em Dólar", "Investimentos em dólar serão implementados em breve!")
  }

  const handleFixedIncome = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para investir")
      return
    }
    console.log("Abrindo renda fixa...")
    Alert.alert("Renda Fixa", "Investimentos em renda fixa serão implementados em breve!")
  }

  const handleSavings = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para acessar a poupança")
      return
    }
    if (!accounts || accounts.length === 0) {
      Alert.alert("Erro", "Você precisa ter uma conta para acessar a poupança")
      return
    }
    console.log("Abrindo poupança...")
    const savingsAccount = accounts.find((acc) => acc.accountType === "SAVINGS")
    if (savingsAccount) {
      Alert.alert(
        "Poupança",
        `Saldo atual: R$ ${savingsAccount.balance.toFixed(2).replace(".", ",")}\n\nRendimento mensal: 0,5%`,
      )
    } else {
      Alert.alert("Poupança", "Você ainda não possui uma conta poupança. Deseja abrir uma?")
    }
  }

  const handleFunds = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para investir")
      return
    }
    console.log("Abrindo fundos...")
    Alert.alert("Fundos de Investimento", "Fundos de investimento serão implementados em breve!")
  }

  const handleShowMore = () => {
    console.log("Mostrando mais opções...")
    Alert.alert(
      "Mais Investimentos",
      "Outras opções de investimento:\n\n• COE\n• Debêntures\n• LCI/LCA\n• CRI/CRA\n• Previdência Privada",
    )
  }

  const features = [
    {
      label: "Ações               Brasil",
      icon: require("../assets/investments/brazil-flag.png"),
      iconSize: 28,
      onPress: handleBrazilStocks,
    },
    {
      label: "Tesouro         Direto",
      icon: require("../assets/investments/gold-chest.png"),
      iconSize: 28,
      onPress: handleTreasury,
    },
    {
      label: "Criptomoeda",
      icon: require("../assets/investments/bitcoin.png"),
      iconSize: 28,
      onPress: handleCrypto,
    },
    {
      label: "Investimentos   em Dólar",
      icon: require("../assets/investments/dolar-invest.png"),
      iconSize: 28,
      onPress: handleDollarInvest,
    },
    {
      label: "Renda                Fixa",
      icon: require("../assets/investments/fixed-income.png"),
      iconSize: 28,
      onPress: handleFixedIncome,
    },
    {
      label: "Poupança",
      icon: require("../assets/investments/savings.png"),
      iconSize: 28,
      onPress: handleSavings,
    },
    {
      label: "Fundos",
      icon: require("../assets/investments/funds.png"),
      iconSize: 28,
      onPress: handleFunds,
    },
    {
      label: "Mostrar           mais",
      icon: require("../assets/home/more.png"),
      iconSize: 28,
      onPress: handleShowMore,
    },
  ]

  return (
    <View style={styles.container}>
      <Header
        title="Investimentos"
        gap={95}
        middleIconSource={require("../assets/home/search.png")}
        middleIconStyle={{ marginLeft: 55, width: 20, height: 20 }}
        onMiddleIconPress={handleSearch}
        rightIconSource={require("../assets/cards/settings.png")}
        rightIconStyle={{ marginLeft: 10, width: 22, height: 22 }}
        onRightIconPress={handleSettings}
      />
      <InvestSaldo user={user} accounts={accounts} />
      <PixFeatureGrid
        features={features}
        iconBorderRadius={10}
        itemStyle={{ width: screenWidth / 4 - 12 }}
        gridStyle={{ flexWrap: "wrap", justifyContent: "center" }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
})

export default InvestScreen
