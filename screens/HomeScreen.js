import React, { useState } from 'react';
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
import { authService } from '../services/authService';

export default function HomeScreen({ navigation }) {
  const [isGuest, setIsGuest] = useState(false);

  React.useEffect(() => {
    checkGuestMode();
  }, []);

  const checkGuestMode = async () => {
    const guest = await authService.isGuestMode();
    setIsGuest(guest);
  };

  const handleStartChallenge = () => {
    // Navigate to challenges list or directly to a challenge
    navigation.navigate('Challenges');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
          {isGuest && (
            <View style={styles.guestBadge}>
              <Text style={styles.guestText}>Guest Mode</Text>
            </View>
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Featured Challenge Banner */}
          <View style={styles.featuredBanner}>
            <View style={styles.bannerContent}>
              <Ionicons name="trophy" size={32} color={colors.white} />
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>Daily Challenge</Text>
                <Text style={styles.bannerSubtitle}>Test your knowledge today!</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartChallenge}
            >
              <Text style={styles.startButtonText}>Start Now</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleStartChallenge}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="play" size={24} color={colors.white} />
                </View>
                <Text style={styles.actionText}>Start Challenge</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleStartChallenge}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="trophy" size={24} color={colors.white} />
                </View>
                <Text style={styles.actionText}>Browse Challenges</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Section (only for registered users) */}
          {!isGuest && (
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Your Stats</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>0</Text>
                  <Text style={styles.statLabel}>Challenges Completed</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>0</Text>
                  <Text style={styles.statLabel}>Total Points</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>0</Text>
                  <Text style={styles.statLabel}>Current Streak</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
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
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
  },
  guestBadge: {
    backgroundColor: colors.cardDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.green,
  },
  guestText: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'System',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  featuredBanner: {
    margin: 20,
    backgroundColor: colors.green,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.glowGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerText: {
    marginLeft: 16,
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
    fontFamily: 'System',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    fontFamily: 'System',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    gap: 8,
  },
  startButtonText: {
    color: colors.green,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 16,
    fontFamily: 'System',
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.blackLight,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'System',
  },
  actionSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    fontFamily: 'System',
  },
  statsSection: {
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.green,
    fontFamily: 'System',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'System',
  },
});
