import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  View,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native"
import InputField from "../components/Input"
import Button from "../components/Button"
import Logo from "../components/logo"
import Footer from "../components/Footer"
import UserProfile from "../components/SecureProfile";

export default function SecureLoginScreen() {
  const navigation = useNavigation(); 

  const [credentials, setCredentials] = useState({
    senha: "",
  })
  const [showFaceId, setShowFaceId] = useState(false);
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
    navigation.navigate("Home")
  }
  
    const userData = {
      name: 'Vinicius Macedo',
      id: '1584978-1',
    };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <Image source={require("../assets/login/help.png")} style={styles.image} />
            <Logo />
            <View style={styles.formContainer}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <UserProfile user={userData} />
            </SafeAreaView>
              <InputField
                label="Senha"
                value={credentials.senha}
                onChangeText={(text) => setCredentials({ ...credentials, senha: text })}
                secureTextEntry
              />
              <Button title="Entrar" onPress={handleLogin} />
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>


      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => setShowFaceId(true)} style={styles.faceIdWrapper}>
            <Image source={require("../assets/secureLogin/face-id-blue.png")} style={styles.faceIdIcon} />
        </TouchableOpacity>

        <View style={styles.accountWrapper}>
            <TouchableOpacity>
              <Footer navigation={navigation} style={styles.accountText}/>
            </TouchableOpacity>
        </View>

        
        </View>


        <Modal
        animationType="fade"
        transparent={true}
        visible={showFaceId}
        onRequestClose={() => setShowFaceId(false)}
        >
        <View style={styles.modalOverlay}>
            <Image
            source={require("../assets/secureLogin/face-id-white.png")}
            style={styles.faceIdFeedback}
            />
        </View>
        </Modal>

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
    forgotPassword: {
      color: "#42a5f5",
      fontSize: 18,
      fontFamily: "InterBold",
      textAlign: "center",
      marginTop: 16,
    },
    footerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 24,
    },
    faceIdWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    faceIdIcon: {
      width: 40,
      height: 40,
      resizeMode: "contain",
    },
    accountWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    accountText: {
      fontSize: 18,
      fontFamily: "InterBold",
      color: "#42a5f5",
      marginLeft: 160,
      marginTop: 40,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      justifyContent: "center",
      alignItems: "center",
    },
    faceIdFeedback: {
      width: 130,
      height: 130,
      resizeMode: "contain",
    },
  }
  
