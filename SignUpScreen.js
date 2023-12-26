import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ImageBackground,ScrollView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Compte créé avec succès :", userCredential.user);
        navigation.replace('SignIn');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setErrorMessage("The email format is not valid.");
        } else if (error.code === 'auth/email-already-in-use') {
          setErrorMessage("This email is already used.");
        } else {
          setErrorMessage("Error");
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>  
    <ImageBackground source={require('./images/fond.jpg')} style={styles.container}>
    <View style={styles.container}>
      <Image source={require('./images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>
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
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.signinButton}>
        <Text style={styles.signinText}>Already registered ? Login</Text>
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
    flex: 1,
    justifyContent: 'center',
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
    signinButton: {
      marginTop: 15,
    },
    signinText: {
      color: 'white',
    },
   
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  });

export default SignUpScreen;

