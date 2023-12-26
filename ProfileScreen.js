import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground,ScrollView } from 'react-native';
import { getAuth, signOut, sendPasswordResetEmail } from 'firebase/auth';

function ProfileScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.replace('SignIn');
    }).catch((error) => {
      setMessage('Problème de déconnexion');
    });
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        setMessage("A password reset email has been sent.");
      })
      .catch((error) => {
        setMessage("Erreur: " + error.message);
      });
  };

  const handleGoToCategories = () => {
    navigation.navigate('Categories'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <ImageBackground source={require('./images/fond.jpg')} style={styles.container}>  
    <View style={styles.container}>
    <Image source={require('./images/logo.png')} style={styles.logo} />
   
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.changePasswordButton} onPress={handlePasswordReset}>
      <Text style={styles.changePasswordButtonText}>Change Password </Text>
      </TouchableOpacity>

      <Text style={styles.message}>{message}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Image
          source={require('./images/deconnect.png')}
          style={styles.logoutIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.homeButton} onPress={handleGoToCategories}>
          <Image
            source={require('./images/home.png')}
            style={styles.homeIcon}
          />
        </TouchableOpacity>
    </View>
    </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%', 
  },
  profile: {
    fontSize: 23, 
    fontWeight: 'bold', 
    color: '#f575faff', 
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  email: {
    fontSize: 18,
    color: '#abfcfeff',
    marginBottom: 10,
  },
  message: {
    color: '#86BEDA', 
    textAlign: 'center',
    margin: 10,
  },
  changePasswordButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#abfcfeff', 
    borderWidth: 1,
    borderRadius: 25, 
  },
  changePasswordButtonText: {
    color: '#abfcfeff', 
    fontWeight: 'bold',
  },
  logoutButton: {
    position: 'absolute',
    top: 70, 
    right: 30, 
    padding: 10,
  },
  logoutIcon: {
    width: 35,
    height: 35,
  },
  homeButton: {
    position: 'absolute',
    left: 40,
    bottom: 60, 
  },
  homeIcon: {
    width: 40, 
    height: 40, 
  },
  logo: {
    width: 120, 
    height: 120, 
    resizeMode: 'contain',
    marginTop: 40, 
    alignSelf: 'center', 
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default ProfileScreen;
 
