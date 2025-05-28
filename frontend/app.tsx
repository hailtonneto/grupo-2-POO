import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "./screens/LoginScreen"
import SecureLoginScreen from "./screens/SecureLoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import HomeScreen from "./screens/HomeScreen"
import PixScreen from "./screens/PixScreen"
import PaymentScreen from "./screens/PaymentScreen"
import CardsScreen from "./screens/CardsScreen"
import RechargeScreen from "./screens/RechargeScreen"
import InvestScreen from "./screens/InvestScreen"
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SecureLogin" component={SecureLoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Pix" component={PixScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cards" component={CardsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Recharge" component={RechargeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Invest" component={InvestScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}
