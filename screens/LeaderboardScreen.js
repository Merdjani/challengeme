import React from 'react';
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
import { colors } from '../theme/colors';

export default function LeaderboardScreen({ navigation }) {
  const users = [
    { id: '1', name: 'Friend A', points: 2300, isTop: true, avatar: '👤' },
    { id: '2', name: 'You', points: 2300, isTop: true, avatar: '👤' },
    { id: '3', name: 'You', points: 2220, isTop: false, avatar: '👤' },
    { id: '4', name: 'Friend C', points: 1820, isTop: false, avatar: '👤' },
    { id: '5', name: 'Friend D', points: 1220, isTop: false, avatar: '👤' },
  ];

  const getRankIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return null;
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
          <Text style={styles.title}>Leaderboard</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {users.map((user, index) => {
            const isTopThree = index < 3;
            const rankIcon = getRankIcon(index);

            return (
              <View
                key={user.id}
                style={[
                  styles.userCard,
                  user.isTop && styles.topUserCard,
                ]}
              >
                {user.isTop && (
                  <View style={styles.glowContainer}>
                    <LinearGradient
                      colors={[colors.glowBlue, 'transparent']}
                      style={styles.glowEffect}
                    />
                  </View>
                )}
                <View style={styles.userInfo}>
                  <View style={styles.avatarContainer}>
                    <View style={[styles.avatar, isTopThree && styles.topAvatar]}>
                      <Text style={styles.avatarText}>{user.avatar}</Text>
                    </View>
                    {rankIcon && (
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankIcon}>{rankIcon}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userPoints}>{user.points} pts</Text>
                  </View>
                </View>
                <View style={styles.rankIndicator}>
                  <View style={styles.rankDot} />
                </View>
              </View>
            );
          })}
        </ScrollView>
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
  title: {
    fontSize: 32,
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
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardLight,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    overflow: 'visible',
  },
  topUserCard: {
    borderWidth: 2,
    borderColor: colors.glowBlue,
    shadowColor: colors.glowBlue,
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  glowContainer: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 24,
    overflow: 'hidden',
    zIndex: -1,
  },
  glowEffect: {
    flex: 1,
    opacity: 0.3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.cardGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  topAvatar: {
    borderColor: colors.progressBlue,
    borderWidth: 3,
  },
  avatarText: {
    fontSize: 24,
  },
  rankBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.textPrimary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankIcon: {
    fontSize: 14,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  userPoints: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  rankIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.textSecondary,
  },
  rankDot: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: colors.textSecondary,
  },
});

