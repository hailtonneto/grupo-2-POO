import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter"
import { useState } from "react"
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator, 
} from "react-native"

export default function CesarBankLogin() {
  const [credentials, setCredentials] = useState({
    login: "",
    senha: "",
  })
  
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterBold: Inter_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#42a5f5" />
      </SafeAreaView>
    )
  }

  const handleLogin = () => {
    console.log("Login attempt with:", credentials)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <View style={styles.content}>
          <View>
            <Image source={require("./assets/help.png")} style={styles.image} />
          </View>

          <View style={styles.logoContainer}>
            <Text style={styles.cesarText}>cesar</Text>
            <Text style={styles.bankText}>bank</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Login</Text>
              <TextInput
                style={styles.input}
                placeholder="Login"
                value={credentials.login}
                onChangeText={(text) => setCredentials({ ...credentials, login: text })}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                value={credentials.senha}
                onChangeText={(text) => setCredentials({ ...credentials, senha: text })}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.footerText}>Trocar ou abrir conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    gap: 40,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 325,
    marginTop: 20,
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 0,
  },
  cesarText: {
    color: "#42a5f5",
    fontWeight: "bold",
    fontSize: 53,
    fontFamily: "InterRegular",
  },
  bankText: {
    color: "#42a5f5",
    fontWeight: "bold",
    fontSize: 36,
    marginTop: -26,
    fontFamily: "InterBold", 
  },
  formContainer: {
    width: "100%",
    marginBottom: 40,
    marginTop: 50,
    gap: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
    fontFamily: "InterRegular", 
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    fontFamily: "InterRegular",
  },
  button: {
    backgroundColor: "#42a5f5",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "InterBold", 
  },
  footer: {
    flex: 1,
    marginTop: 110,
    marginLeft: 210,
  },
  footerText: {
    color: "#42a5f5",
    fontSize: 18,
    flex: 1,
    fontWeight: "bold",
    fontFamily: "InterRegular", 
  },
})
