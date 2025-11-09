import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { challengeService } from '../services/challengeService';

export default function ChallengeRoomScreen({ route, navigation }) {
  const { challengeId } = route.params;
  const [challenge, setChallenge] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallenge();
  }, [challengeId]);

  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  const loadChallenge = async () => {
    try {
      const data = await challengeService.getChallengeDetails(challengeId);
      setChallenge(data);
    } catch (error) {
      console.error('Error loading challenge:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const question = challenge.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    const newAnswers = [...answers, { questionIndex: currentQuestion, selectedAnswer, isCorrect }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(prev => prev + 10);
    }

    if (currentQuestion < challenge.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const totalQuestions = challenge.questions.length;
    const correctAnswers = answers.filter(a => a.isCorrect).length;

    navigation.replace('Results', {
      score,
      totalQuestions,
      correctAnswers,
      challengeId,
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading Challenge...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!challenge) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>Challenge not found</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!isStarted) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.title}>Challenge Room</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDescription}>{challenge.description}</Text>

              <View style={styles.challengeStats}>
                <View style={styles.statItem}>
                  <Ionicons name="help-circle" size={20} color={colors.green} />
                  <Text style={styles.statText}>{challenge.questions?.length || 0} Questions</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="time" size={20} color={colors.green} />
                  <Text style={styles.statText}>5 Minutes</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="trophy" size={20} color={colors.green} />
                  <Text style={styles.statText}>{challenge.questions?.length * 10 || 0} Points Max</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.startContainer}>
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Text style={styles.startButtonText}>Start Challenge</Text>
              <Ionicons name="play" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const question = challenge.questions[currentQuestion];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.questionCounter}>
            {currentQuestion + 1} / {challenge.questions.length}
          </Text>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          <Text style={styles.scoreText}>{score} pts</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.question}</Text>

            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === index && styles.optionButtonSelected,
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedAnswer === index && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedAnswer === null && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={selectedAnswer === null}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion === challenge.questions.length - 1 ? 'Finish' : 'Next'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
  },
  placeholder: {
    width: 24,
  },
  questionCounter: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  timer: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.green,
    fontFamily: 'System',
  },
  scoreText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'System',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  challengeInfo: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  challengeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'System',
  },
  challengeDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontFamily: 'System',
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'System',
  },
  startContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: 12,
    height: 56,
    gap: 12,
    shadowColor: colors.glowGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  startButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
  questionContainer: {
    paddingTop: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 32,
    lineHeight: 28,
    fontFamily: 'System',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.blackLight,
  },
  optionButtonSelected: {
    borderColor: colors.green,
    backgroundColor: colors.green + '20',
  },
  optionText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'System',
  },
  optionTextSelected: {
    color: colors.green,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: 12,
    height: 56,
    gap: 12,
    shadowColor: colors.glowGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
});
