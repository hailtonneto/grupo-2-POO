import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput
} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/logo"
import { useFonts, Kadwa_400Regular, Kadwa_700Bold } from "@expo-google-fonts/kadwa";
import {
  ChevronRight
} from 'lucide-react-native'

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isBalanceVisible, setBalanceVisible] = React.useState(false)
  const [isSearching, setSearching] = React.useState(false)
  const [searchText, setSearchText] = React.useState('')

  const handlePix = () => {
    console.log("Redirecionando para Pix...");
    navigation.navigate("Pix");
  };
  const handlePayment = () => {
    console.log("Redirecionando para Pagamentos...");
    navigation.navigate("Payment");
  };
  const handleCards = () => {
    console.log("Redirecionando para Cartoes...");
    navigation.navigate("Cards");
  };
  const handleRecharge = () => {
    console.log("Redirecionando para Recargas...");
    navigation.navigate("Recharge");
  };
  const handleInvest = () => {
    console.log("Redirecionando para Investimentos...");
    navigation.navigate("Invest");
  };
  const [fontsLoaded] = useFonts({
      "Kadwa-Regular": Kadwa_400Regular,
      "Kadwa-Bold": Kadwa_700Bold,
    });

    if (!fontsLoaded) {
      return null;
    }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo
          styleCesar={{ fontSize: 30 }}
          styleBank={{ fontSize: 22, marginTop: -31 }}
        />
        {!isSearching ? (
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => setBalanceVisible(prev => !prev)}>
              <Image
                source={
                  isBalanceVisible
                    ? require('../assets/home/blocked-eye.png')
                    : require('../assets/home/eye.png')
                }
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSearching(true)}>
              <Image source={require('../assets/home/search.png')} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.avatar}>
              <Image source={require('../assets/home/profile.png')} style={styles.avatarIcon}/>
            </View>
          </View>
        ) : (
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
            onBlur={() => setSearching(false)}
          />
        )}

      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <Text style={styles.balanceText}>
              {isBalanceVisible ? 'R$ 0,00' : 'R$ ••••'}
            </Text>
            <ChevronRight color="#fff" size={24} />
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity>
            <ActionButton
              label="Pix"
              icon={require('../assets/home/pix.png')}
              onPress={handlePix}
            />
            </TouchableOpacity>
            <TouchableOpacity>
            <ActionButton
              label="Pagar"
              icon={require('../assets/home/barcode.png')}
              onPress={handlePayment}
            />
            </TouchableOpacity>
            <ActionButton 
            label="Cartões" 
            icon={require('../assets/home/cards.png')} 
            onPress={handleCards}
            />
          </View>
        </View>

        <View style={styles.quickActions}>
          <QuickAction icon={require('../assets/home/invest.png')} label="Invest" onPress={handleInvest}/>
          <QuickAction icon={require('../assets/home/loan (2).png')} label="Emprest" />
          <QuickAction icon={require('../assets/home/phone.png')} label="Recargas" onPress={handleRecharge}/>
          <QuickAction icon={require('../assets/home/gas-station.png')} label="Shell Box" />
          <QuickAction icon={require('../assets/home/piggy-bank.png')} label="Meu Porquinho" />
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <NavButton icon={<Image source={require('../assets/home/home.png')} style={styles.navIcon} />} label="Início" />
        <NavButton icon={<Image source={require('../assets/home/invest.png')} style={styles.navIcon} onPress={handleInvest}/>} label="Invest" />
        <TouchableOpacity style={styles.navButtonMiddle}>
          <Text style={styles.navLabelMiddle}>Cb</Text>
        </TouchableOpacity>
        <NavButton icon={<Image source={require('../assets/home/travel.png')} style={styles.navIcon} />} label="Viagens" />
        <NavButton icon={<Image source={require('../assets/home/more.png')} style={styles.navIcon} />} label="Todos" />
      </View>
    </View>
  )
}

function ActionButton({ label, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Image source={icon} style={styles.actionIcon} />
      <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
  )
}

function QuickAction({ icon, label, onPress}) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={styles.quickActionIcon}>
        <Image source={icon} style={styles.quickIconImage} />
      </View>
      <Text style={styles.quickActionText}>{label}</Text>
    </TouchableOpacity>
  )
}

function NavButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.navButton} onPress={onPress}>
      {icon}
      <Text style={styles.navLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'InterRegular',
    marginTop: 19,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 22,
    alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: '#3399dd',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
  },
  balanceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 22,
    fontFamily:'InterBold',
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#2288cc',
    paddingVertical: 8 ,
    paddingHorizontal: 12,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 14,
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    marginBottom: -2,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 16,
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '18%',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#3399dd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickIconImage: {
    width: 24,
    height: 24,
  },
  quickActionText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    color:'#3399dd',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#3399dd',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navButton: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 11,
    color: 'white',
    marginTop: 4,
  },
  navIcon: {
    width: 23,
    height: 23,
  },
  navButtonMiddle: {
    alignItems: 'center',
  },
  navLabelMiddle: {
    fontSize: 20,
    color: 'white',
    fontFamily:"Kadwa-Bold",
  },
  searchInput: {
    flex: 1,
    marginLeft: 16,
    borderRadius: 8,
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    fontSize: 16,
    height: 40,
  },
  icon: {
    width: 25,
    height: 25,
  },
  avatarIcon: {
    width: 32,
    height: 32,
  },  
})
