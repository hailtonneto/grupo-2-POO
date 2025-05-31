import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  View,
  SafeAreaView,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
} from "react-native"
import InputField from "../components/Input"
import Button from "../components/Button"
import Logo from "../components/logo"
import Footer from "../components/Footer"
import { useAuth } from "../src/hooks/useAuth";

export default function LoginScreen() {
  const navigation = useNavigation(); 
  const { login, loading, error } = useAuth();

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

  const handleLogin = async () => {
    if (!credentials.login || !credentials.senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      await login({ 
        email: credentials.login, 
        password: credentials.senha 
      });
      
      navigation.navigate("Home"); 
      
    } catch (error) {
      Alert.alert("Erro", "CPF ou senha incorretos");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <Image source={require("../assets/login/help.png")} style={styles.image} />
            <Logo />
            <View style={styles.formContainer}>
              <InputField
                label="Login"
                value={credentials.login}
                onChangeText={(text) => setCredentials({ ...credentials, login: text })}
              />
              <InputField
                label="Senha"
                value={credentials.senha}
                onChangeText={(text) => setCredentials({ ...credentials, senha: text })}
                secureTextEntry
              />
              <Button 
                title={loading ? "Carregando..." : "Entrar"} 
                onPress={handleLogin} 
                disabled={loading}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Footer navigation={navigation}/>
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
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 50,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 315,
    marginTop: 20,
  },
  formContainer: {
    width: "100%",
    marginTop: 30,
    gap: 15,
  },
})