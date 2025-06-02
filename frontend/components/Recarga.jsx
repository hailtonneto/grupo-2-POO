"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Alert } from "react-native"
import { Picker } from "@react-native-picker/picker"

const Recarga = ({ user, accounts = [] }) => {
  const [operadora, setOperadora] = useState("")
  const [telefone, setTelefone] = useState("")
  const [salvarFavorito, setSalvarFavorito] = useState(true)
  const [valorRecarga, setValorRecarga] = useState("")
  const [loading, setLoading] = useState(false)

  const formatarParaReais = (valor) => {
    const numero = valor.replace(/\D/g, "")
    if (!numero) return ""
    const reais = (Number.parseInt(numero, 10) / 100).toFixed(2)
    return reais.replace(".", ",")
  }

  const handleValorChange = (texto) => {
    const formatado = formatarParaReais(texto)
    setValorRecarga(formatado)
  }

  const formatarTelefone = (texto) => {
    const numero = texto.replace(/\D/g, "")
    if (numero.length <= 11) {
      const formatado = numero.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4")
      return formatado
    }
    return telefone
  }

  const handleTelefoneChange = (texto) => {
    const formatado = formatarTelefone(texto)
    setTelefone(formatado)
  }

  const handleFavoritos = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para acessar os favoritos")
      return
    }

    console.log("Abrindo favoritos...")
    Alert.alert(
      "Números Favoritos",
      `Favoritos salvos para ${user.name}:\n\n• (11) 9 9999-9999 - Vivo\n• (21) 8 8888-8888 - Tim\n\nDeseja usar um destes números?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Usar primeiro",
          onPress: () => {
            setTelefone("(11) 9 9999-9999")
            setOperadora("vivo")
          },
        },
      ],
    )
  }

  const validarRecarga = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para fazer recargas")
      return false
    }

    if (!operadora) {
      Alert.alert("Erro", "Selecione uma operadora")
      return false
    }

    if (!telefone || telefone.length < 15) {
      Alert.alert("Erro", "Digite um número de telefone válido")
      return false
    }

    if (!valorRecarga || Number.parseFloat(valorRecarga.replace(",", ".")) <= 0) {
      Alert.alert("Erro", "Digite um valor válido para recarga")
      return false
    }

    const valor = Number.parseFloat(valorRecarga.replace(",", "."))
    if (valor < 5) {
      Alert.alert("Erro", "O valor mínimo para recarga é R$ 5,00")
      return false
    }

    if (valor > 100) {
      Alert.alert("Erro", "O valor máximo para recarga é R$ 100,00")
      return false
    }

    if (accounts.length === 0) {
      Alert.alert("Erro", "Você precisa ter uma conta para fazer recargas")
      return false
    }

    const saldoTotal = accounts.reduce((sum, account) => sum + account.balance, 0)
    if (valor > saldoTotal) {
      Alert.alert("Erro", "Saldo insuficiente para realizar a recarga")
      return false
    }

    return true
  }

  const handleRecarga = async () => {
    if (!validarRecarga()) return

    const valor = Number.parseFloat(valorRecarga.replace(",", "."))

    Alert.alert(
      "Confirmar Recarga",
      `Confirma a recarga?\n\nOperadora: ${operadora.toUpperCase()}\nTelefone: ${telefone}\nValor: R$ ${valorRecarga}\n\nO valor será debitado da sua conta.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            setLoading(true)
            console.log("Processando recarga...")

            // Simular processamento
            setTimeout(() => {
              setLoading(false)
              Alert.alert(
                "Recarga Realizada!",
                `Recarga de R$ ${valorRecarga} realizada com sucesso!\n\nOperadora: ${operadora.toUpperCase()}\nTelefone: ${telefone}\n\nComprovante enviado por SMS.`,
              )

              // Salvar como favorito se selecionado
              if (salvarFavorito) {
                console.log("Salvando como favorito...")
              }

              // Limpar formulário
              setOperadora("")
              setTelefone("")
              setValorRecarga("")
            }, 2000)
          },
        },
      ],
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dados da Recarga</Text>
        <TouchableOpacity onPress={handleFavoritos}>
          <Text style={styles.favoritos}>Favoritos</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Operadora</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={operadora} onValueChange={(itemValue) => setOperadora(itemValue)} style={styles.picker}>
          <Picker.Item label="Selecione uma operadora" value="" enabled={false} />
          <Picker.Item label="Vivo" value="vivo" />
          <Picker.Item label="Tim" value="tim" />
          <Picker.Item label="Claro" value="claro" />
          <Picker.Item label="Oi" value="oi" />
        </Picker>
      </View>

      <Text style={styles.label}>Número de telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="(00) 0 0000-0000"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={handleTelefoneChange}
        maxLength={16}
      />

      <View style={styles.favoritoContainer}>
        <TouchableOpacity style={styles.favoritoButton}>
          <Text style={styles.favoritoText}>Salvar como favorito</Text>
          <Switch value={salvarFavorito} onValueChange={setSalvarFavorito} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>Quanto você quer recarregar?</Text>
      <TextInput
        style={styles.valorInput}
        placeholder="R$ 0,00"
        keyboardType="numeric"
        value={valorRecarga ? `R$ ${valorRecarga}` : ""}
        onChangeText={handleValorChange}
      />

      <View style={styles.valoresSugeridos}>
        <Text style={styles.valoresSugeridosTitle}>Valores sugeridos:</Text>
        <View style={styles.valoresGrid}>
          {["10,00", "20,00", "30,00", "50,00"].map((valor) => (
            <TouchableOpacity key={valor} style={styles.valorSugerido} onPress={() => setValorRecarga(valor)}>
              <Text style={styles.valorSugeridoText}>R$ {valor}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.recargarButton, { opacity: loading ? 0.5 : 1 }]}
        onPress={handleRecarga}
        disabled={loading}
      >
        <Text style={styles.recargarButtonText}>{loading ? "Processando..." : "Recarregar"}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#0EA5E9",
    fontFamily: "InterBold",
  },
  favoritos: {
    color: "#0EA5E9",
    fontFamily: "InterBold",
    fontSize: 14,
  },
  label: {
    marginTop: 27,
    fontSize: 14,
    color: "#0EA5E9",
  },
  pickerContainer: {
    backgroundColor: "#eee",
    borderRadius: 8,
    marginTop: 9,
    fontFamily: "InterBold",
  },
  picker: {
    height: 50,
    color: "#888",
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
    marginTop: 9,
    fontFamily: "InterBold",
  },
  favoritoContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#0EA5E9",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  favoritoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  favoritoText: {
    color: "#0EA5E9",
    fontFamily: "InterBold",
    fontSize: 15,
  },
  subTitle: {
    marginTop: 30,
    fontSize: 20,
    fontFamily: "InterBold",
    color: "#0EA5E9",
    textAlign: "center",
  },
  valorInput: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: "#aaa",
    textAlign: "center",
    textDecorationLine: "underline",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
  },
  valoresSugeridos: {
    marginTop: 20,
  },
  valoresSugeridosTitle: {
    fontSize: 14,
    color: "#0EA5E9",
    fontFamily: "InterBold",
    marginBottom: 10,
  },
  valoresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  valorSugerido: {
    backgroundColor: "#f0f9ff",
    borderWidth: 1,
    borderColor: "#0EA5E9",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    width: "48%",
    alignItems: "center",
  },
  valorSugeridoText: {
    color: "#0EA5E9",
    fontFamily: "InterBold",
  },
  recargarButton: {
    backgroundColor: "#0EA5E9",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
  },
  recargarButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "InterBold",
  },
})

export default Recarga
