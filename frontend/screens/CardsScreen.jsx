"use client"
import { View, StyleSheet } from "react-native"
import Header from "../components/Header"
import CardInterface from "../components/CardInterface"
import { useAuth } from "../src/hooks/useAuth"
import { useCards } from "../src/hooks/useCards"

const CardsScreen = () => {
  const { user } = useAuth()
  const { cards, loading } = useCards()

  const userName = user?.name || "Usuário"

  return (
    <View style={styles.container}>
      <Header
        title="Cartões"
        gap={130}
        rightIconSource={require("../assets/cards/settings.png")}
        rightIconStyle={{ marginLeft: 120 }}
        onRightIconPress={() => console.log("Abrindo configurações...")}
      />
      <CardInterface userName={userName} cards={cards} loading={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})

export default CardsScreen
