import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ImageBackground} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

const categories = [
  { id: 9, name: 'General culture' },
  { id: 12, name: 'Music' },
  { id: 31, name: 'Manga' },
  { id: 15, name: 'Video games' },
  { id: 18, name: 'Computer science' },   
  { id: 19, name: 'Mathematics' },
];

function CategoriesScreen({ navigation }) {
  const auth = getAuth();

  const goToCategory = (category) => {
    navigation.navigate('QuizScreen', {
      categoryId: category.id,
      categoryName: category.name
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <ImageBackground source={require('./images/fond.jpg')} style={styles.container}> 
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={require('./images/logo.png')} style={styles.logo} />
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.button}
            onPress={() => goToCategory(category)}
          >
            <Text style={styles.buttonText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Image
          source={require('./images/profil.png')}
          style={styles.profileIcon}
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
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#360066ef',
    padding: 15,
    minWidth: 100,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileButton: {
    position: 'absolute',
    top: 70,
    right: 40, 
  },
  profileIcon: {
    width: 35,
    height: 35,
  },
  scrollViewStyle: {
    width: '100%', 
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default CategoriesScreen;
