import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientBackground from '../components/GradientBackground';
import ChallengeCard from '../components/ChallengeCard';
import { colors } from '../theme/colors';

export default function OngoingChallengesScreen({ navigation }) {
  const [challenges] = useState([
    { id: '1', name: 'Read 10 Pages Daily', currentDay: 7, duration: 10 },
    { id: '2', name: 'Meditate 15 Min', currentDay: 9, duration: 10 },
    { id: '3', name: 'Run 5K Every Other Day', currentDay: 5, duration: 10 },
    { id: '4', name: 'Read 10 Pages Daily', currentDay: 3, duration: 10 },
  ]);

  const handleChallengePress = (challenge) => {
    navigation.navigate('ChallengeDetails', { challenge });
  };

  const handleAddChallenge = () => {
    navigation.navigate('CreateChallenge');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Ongoing Challenges</Text>
          <TouchableOpacity
            style={styles.leaderboardButton}
            onPress={() => navigation.navigate('Leaderboard')}
          >
            <Ionicons name="trophy" size={24} color={colors.softBlue} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPress={() => handleChallengePress(challenge)}
            />
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddChallenge}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colors.progressBlue, colors.progressMint]}
            style={styles.fabGradient}
          >
            <Ionicons name="add" size={32} color={colors.textPrimary} />
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'System',
  },
  leaderboardButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: colors.glowBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

