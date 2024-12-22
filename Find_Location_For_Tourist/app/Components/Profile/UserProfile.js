import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { MaterialIcons, Feather } from '@expo/vector-icons';

export default function UserProfile({ profile, onLogout }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert('Logged out!');
    onLogout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: profile?.pPicture || 'https://via.placeholder.com/150' }}
          style={styles.image}
        />
        <Text style={styles.heading}>{profile?.username || 'User'}</Text>

        <View style={styles.infoContainer}>
          <Feather name="mail" size={20} style={styles.icon} />
          <Text style={styles.infoText}>{profile?.email || 'N/A'}</Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="phone" size={20} style={styles.icon} />
          <Text style={styles.infoText}>{profile?.phone || 'N/A'}</Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="cake" size={20} style={styles.icon} />
          <Text style={styles.infoText}>{profile?.birthday || 'N/A'}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#6200ee',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  icon: {
    color: '#6200ee',
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    flexShrink: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
