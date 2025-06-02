import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import Button from "../components/Button";
import Checkbox from "../components/CheckBox";
import InputField from "../components/Input";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereço: "",
    termsAccepted: false,
  });

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data on Submit:", formData);
    console.log("Formulário válido, redirecionando para Home...");
    navigation.navigate("Home");
  };

  const isFormValid =
    formData.nome !== "" &&
    formData.cpf !== "" &&
    formData.email !== "" &&
    formData.telefone !== "" &&
    formData.endereço !== "" &&
    formData.termsAccepted;

 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft size={20} color="#0EA5E9" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Seus Dados</Text>
      </View>

      {["nome", "cpf", "email", "telefone", "endereço"].map((field) => (
        <InputField
          key={field}
          label={field === "cpf" ? "CPF" : field.charAt(0).toUpperCase() + field.slice(1)}
          labelColor="#0EA5E9"
          placeholder={`Digite seu ${field === "cpf" ? "CPF" : field}`}
          value={formData[field]}
          onChangeText={(text) => handleChange(field, text)}
          keyboardType={
            field === "email"
              ? "email-address"
              : field === "telefone" || field === "cpf"
              ? "numeric"
              : "default"
          }
          secureTextEntry={field === "password"}
          maxLength={field === "cpf" ? 11 : undefined}
        />
      ))}

      <View style={styles.checkboxContainer}>
        <View style={styles.termsTextContainer}>
          <Text style={styles.termsText}>Li e concordo com a{" "}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
            <Text style={styles.linkText}>Política de Privacidade</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>{" "}e com os{" "}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("TermsAndConditions")}>
            <Text style={styles.linkText}>Termos e Condições</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxWrapper}>
          <Checkbox
            checked={formData.termsAccepted}
            onChange={(checked) => handleChange("termsAccepted", checked)}
          />
        </View>
      </View>


      <Button
        title="Confirmar"
        onPress={handleSubmit}
        color={isFormValid ? "#0EA5E9" : "#D3D3D3"} 
        disabled={!isFormValid} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 30,
  },
  headerText: {
    color: "#0EA5E9",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 120,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: "#0EA5E9",
    fontSize: 14,
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: "row", 
    alignItems: "center",  
    justifyContent: "space-between",  
    marginVertical: 10,
  },
  termsTextContainer: {
    flexDirection: "row",
    flexWrap: "wrap", 
  },
  termsText: {
    fontSize: 14,
    color: "#0EA5E9", 
  },
  linkText: {
    color: "#0EA5E9",  
    fontWeight: "bold", 
    marginRight: 80,
  },
  checkboxWrapper: {
    marginLeft: -60,
  },
});
