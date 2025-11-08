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
import GradientBackground from '../components/GradientBackground';
import CircularProgress from '../components/CircularProgress';
import GlowButton from '../components/GlowButton';
import { colors } from '../theme/colors';

export default function ChallengeDetailsScreen({ route, navigation }) {
  const { challenge } = route.params || {
    challenge: { id: '1', name: 'Meditate 15 Min', currentDay: 3, duration: 10 },
  };

  const [activityLog] = useState([
    { id: '1', text: 'You completed Day 3', type: 'completion', time: '2 hours ago' },
    { id: '2', text: 'Friend A joined the challenge', type: 'friend', time: '1 day ago' },
    { id: '3', text: 'You completed Day 2', type: 'completion', time: '1 day ago' },
    { id: '4', text: 'You started this challenge', type: 'start', time: '3 days ago' },
  ]);

  const handleCompleteStep = () => {
    // Handle completion logic here
    console.log('Step completed!');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{challenge.name}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.progressSection}>
            <CircularProgress
              current={challenge.currentDay}
              total={challenge.duration}
              size={220}
            />
          </View>

          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Activity Log</Text>
            {activityLog.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  {activity.type === 'completion' && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.progressMint} />
                  )}
                  {activity.type === 'friend' && (
                    <Ionicons name="person-add" size={20} color={colors.progressBlue} />
                  )}
                  {activity.type === 'start' && (
                    <Ionicons name="play-circle" size={20} color={colors.softBlue} />
                  )}
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{activity.text}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <GlowButton
            title="Complete Step"
            onPress={handleCompleteStep}
            style={styles.completeButton}
          />
        </View>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  progressSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  activitySection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  activityIcon: {
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  completeButton: {
    width: '100%',
  },
});

