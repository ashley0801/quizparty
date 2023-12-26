import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground} from 'react-native';

function ResultsScreen({ route, navigation }) {
  const { totalQuestions, correctAnswers, incorrectAnswers, categoryId, categoryName } = route.params;


  const startNewQuiz = () => {
    navigation.push('QuizScreen', {
      categoryId: categoryId,
      categoryName: categoryName
    });
  };
  
  const goToCategories = () => {
    navigation.navigate('Categories');
  };

  return (
    <ImageBackground source={require('./images/fond.jpg')} style={styles.container}> 
    <View style={styles.container}>
      <Image source={require('./images/logo.png')} style={styles.logo} /> 
      <View style={styles.triangle} />
      <View style={styles.scoreContainer}>
        <Text style={styles.totalQuestionsLabel}>Total Questions</Text>
        <Text style={styles.totalQuestions}>{totalQuestions}</Text>
        <View style={styles.correctIncorrectContainer}>
          <View style={styles.correctContainer}>
            <Text style={styles.correctLabel}>Correct</Text>
            <Text style={styles.correct}>{correctAnswers}</Text>
          </View>
          <View style={styles.incorrectContainer}>
            <Text style={styles.incorrectLabel}>Incorrect</Text>
            <Text style={styles.incorrect}>{incorrectAnswers}</Text>
          </View>
          </View>
          </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={goToCategories}>
          <Image source={require('./images/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={startNewQuiz}>
          <Image source={require('./images/next.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
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
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 150,
      borderRightWidth: 150,
      borderBottomWidth: 300,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#360066ef', 
      transform: [
        {rotate: '360deg'}
      ]
    },
    scoreText: {
      fontSize: 20,
      color: '#AED3E3',
      marginVertical: 3,
    },
    score: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ff00faff',
    },


    scoreContainer: {
      position: 'absolute',
      top: '53%', 
      alignItems: 'center',
    },
    totalQuestionsLabel: {
      fontSize: 20,
      color: '#FFFFFF', 
      marginBottom: 5,
    },
    totalQuestions: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#FFFFFF', 
      marginBottom: 15,
    },
    correctIncorrectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%', 
    },
    correctContainer: {
      alignItems: 'center',
      marginRight: -280,
    },
    incorrectContainer: {
      alignItems: 'center',
     
    },
    correctLabel: {
      fontSize: 18,
      color: '#abfcfeff', 
    },
    correct: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#abfcfeff', 
    },
    incorrectLabel: {
      fontSize: 18,
      color: '#ff00faff', 
    },
    incorrect: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#ff00faff', 
    },


    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      bottom: -30,
    },
    icon: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
  });

export default ResultsScreen;