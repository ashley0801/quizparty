import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,Image, ImageBackground,ScrollView} from 'react-native';
import he from 'he';

function QuizScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple&language=fr`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const formattedQuestions = data.results.map(question => ({
          ...question,
          question: he.decode(question.question),
          correct_answer: he.decode(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map(ans => he.decode(ans)),
          allAnswers: shuffleArray([
            ...question.incorrect_answers.map(ans => he.decode(ans)),
            he.decode(question.correct_answer),
          ]),
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  const handleAnswerPress = answer => {
    const correctAnswer = he.decode(questions[currentQuestionIndex].correct_answer);
    const isCorrect = answer === correctAnswer;
    setIsAnswerCorrect(isCorrect);
    setSelectedAnswer(answer);

    if (!isCorrect) {
      setCorrectAnswer(correctAnswer);
    } else {
      setCorrectAnswer(null);
    }

    const updatedQuestions = questions.map((q, index) => {
      if (index === currentQuestionIndex) {
        return { ...q, selectedAnswer: answer };
      }
      return q;
    });
    setQuestions(updatedQuestions);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        const correctAnswersCount = updatedQuestions.filter(q => he.decode(q.correct_answer) === q.selectedAnswer).length;
        const incorrectAnswersCount = questions.length - correctAnswersCount;
        navigation.navigate('ResultsScreen', {
          totalQuestions: questions.length,
          correctAnswers: correctAnswersCount,
          incorrectAnswers: incorrectAnswersCount,
          categoryId: categoryId,
          categoryName: categoryName
        });
      }
    }, 2000);
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  const currentQuestion = questions[currentQuestionIndex] || {};

  return (
    <ImageBackground source={require('./images/fond.jpg')} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>  
    <View style={styles.container}>
    <Image source={require('./images/logo.png')} style={styles.logo} /> 
      <Text style={styles.question}>Question {currentQuestionIndex + 1}/{questions.length}</Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      {currentQuestion.allAnswers?.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            selectedAnswer === answer && (isAnswerCorrect ? styles.correctAnswer : styles.wrongAnswer),
          ]}
          onPress={() => handleAnswerPress(answer)}
          disabled={selectedAnswer !== null}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}

      {selectedAnswer && !isAnswerCorrect && (
        <Text style={styles.correctAnswerText}>Correct answer : {correctAnswer}</Text>
      )}
    </View>
    </ScrollView>
    </ImageBackground>
  );
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%', 
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#360066ef',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerText: {
    color: 'white',
    fontSize: 18,
  },
  correctAnswer: {
    backgroundColor: 'green',
  },
  wrongAnswer: {
    backgroundColor: 'red',
  },
  correctAnswerText: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  logo: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain', 
    marginTop: 20, 
    alignSelf: 'center', 
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default QuizScreen;
