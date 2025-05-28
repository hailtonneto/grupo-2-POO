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
} from "react-native"
import InputField from "../components/Input"
import Button from "../components/Button"
import Logo from "../components/logo"
import Footer from "../components/Footer"
import { login, saveToken } from "../src/services/src/services/authService";

export default function LoginScreen() {
  const navigation = useNavigation(); 

  const [credentials, setCredentials] = useState({
    login: "",
    senha: "",
  })
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      
  
      const response = await login({ 
        cpf: credentials.login, 
        password: credentials.senha 
      });
      
      await saveToken(response.token);
      
      console.log("Login bem-sucedido:", response);
      
      navigation.navigate("Home"); 
      
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      
      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert("Erro", "CPF ou senha incorretos");
        } else {
          Alert.alert("Erro", `Ocorreu um erro ao fazer login: ${error.response.status}`);
        }
      } else if (error.request) {
        Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique sua conexão.");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao processar sua solicitação");
      }
    } finally {
      setLoading(false);
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

const styles = {
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
}