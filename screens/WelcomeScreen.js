import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import { colors } from '../theme/colors';

export default function WelcomeScreen({ navigation }) {
  const handleYes = () => {
    navigation.replace('Dashboard');
  };

  const handleNo = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appName}>ChallengeMe</Text>
          <Text style={styles.subtitle}>Your journey to self-improvement starts here</Text>
          
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Are you ready to begin?</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.yesButton]}
              onPress={handleYes}
              activeOpacity={0.8}
            >
              <Text style={styles.yesButtonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.noButton]}
              onPress={handleNo}
              activeOpacity={0.8}
            >
              <Text style={styles.noButtonText}>No</Text>
            </TouchableOpacity>
          </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  welcomeText: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 10,
    fontFamily: 'System',
  },
  appName: {
    fontSize: 48,
    color: colors.green,
    fontWeight: '700',
    marginBottom: 20,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 60,
    fontFamily: 'System',
  },
  questionContainer: {
    marginBottom: 40,
  },
  questionText: {
    fontSize: 22,
    color: colors.white,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'System',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesButton: {
    backgroundColor: colors.green,
    shadowColor: colors.glowGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  yesButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'System',
  },
  noButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
  },
  noButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'System',
  },
});

