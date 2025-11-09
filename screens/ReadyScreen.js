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

export default function ReadyScreen({ navigation }) {
  const handleYes = () => {
    navigation.navigate('AuthChoice');
  };

  const handleNo = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.logoSection}>
            <Text style={styles.appName}>ChallengeMe</Text>
          </View>

          <View style={styles.messageSection}>
            <Text style={styles.question}>Are you ready to challenge yourself?</Text>
            <Text style={styles.subtitle}>Test your knowledge and push your limits!</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.yesButton]}
              onPress={handleYes}
              activeOpacity={0.8}
            >
              <Text style={styles.yesButtonText}>Yes, I'm Ready!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.noButton]}
              onPress={handleNo}
              activeOpacity={0.8}
            >
              <Text style={styles.noButtonText}>Not Now</Text>
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
  logoSection: {
    marginBottom: 60,
  },
  appName: {
    fontSize: 48,
    color: colors.green,
    fontWeight: '700',
    fontFamily: 'System',
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  question: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'System',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
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
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
  noButton: {
    backgroundColor: colors.cardDark,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  noButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'System',
  },
});
