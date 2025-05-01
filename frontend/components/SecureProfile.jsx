import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const UserProfile = ({ user }) => {
  const getInitials = (name) => {
    const names = name.trim().split(' ');
    const initials = names.map(n => n[0].toUpperCase()).slice(0, 2).join('');
    return initials;
  };
  return (
    <View style={styles.container}>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.id}>{user.id}</Text>
      </View>


      <TouchableOpacity>
            <Text style={styles.text}>
                Trocar senha
            </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  infoSection: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
  },
  id: {
    fontSize: 14,
    color: 'black',
    marginTop: 4,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#4A90E2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  text: {
    color: "#42a5f5", 
    fontSize: 16, 
    fontFamily: "InterBold",
  },
});

export default UserProfile;
