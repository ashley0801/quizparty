import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ImageBackground,ScrollView} from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBOUycWfIw0DiLeuU4ZQvgt3AaDkY-aaCw",
  authDomain: "quizz-8a924.firebaseapp.com",
  projectId: "quizz-8a924",
  storageBucket: "quizz-8a924.appspot.com",
  messagingSenderId: "98674716732",
  appId: "1:98674716732:web:26fbd58dd1b6eeaee51339"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const auth = getAuth();

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log("Utilisateur connecté avec succès :", response.user);
      navigation.replace('Categories');
    })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setErrorMessage('The email format is not valid.');
        } else{
          setErrorMessage('Your account doesn\'t exist.');
        } 
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>   
    <ImageBackground source={require('./images/fond.jpg')} style={styles.container}>
    <View style={styles.container}>
      <Image source={require('./images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signupButton}>
        <Text style={styles.signupText}>No account ? Register</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
    </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  container: {
    flex: 1,justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%', 
  },
 
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
  },
  input: {
    width: '80%',
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white', 
    borderRadius: 5, 
  },
  button: {
    width: '30%',
    padding: 15,
    backgroundColor: '#360066ef', 
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupText: {
    color: 'white',
    marginTop: 15,
  },

  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

});

export default SignInScreen;