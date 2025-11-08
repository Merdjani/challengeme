import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { authService } from '../services/authService';
import { challengeService } from '../services/challengeService';
import TaskCard from '../components/TaskCard';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [userChallenges, setUserChallenges] = useState({ active: [], completed: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const authData = await authService.getAuthData();
      if (authData) {
        setUser(authData.user);
        const challenges = await challengeService.fetchUserChallenges(authData.user.id);
        setUserChallenges(challenges);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('Settings');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.green} />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Ionicons name="settings-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={48} color={colors.green} />
              </View>
            </View>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email || ''}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userChallenges.active.length}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userChallenges.completed.length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userChallenges.active.length + userChallenges.completed.length}
              </Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            {userChallenges.active.length > 0 ? (
              userChallenges.active.map((challenge) => (
                <TaskCard
                  key={challenge.id}
                  task={challenge}
                  onPress={() => navigation.navigate('TaskDetails', { task: challenge })}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No active challenges</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed Challenges</Text>
            {userChallenges.completed.length > 0 ? (
              userChallenges.completed.map((challenge) => (
                <View key={challenge.id} style={styles.completedCard}>
                  <Text style={styles.completedTitle}>{challenge.title}</Text>
                  <Text style={styles.completedDate}>
                    Completed on {new Date(challenge.completedAt).toLocaleDateString()}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No completed challenges</Text>
              </View>
            )}
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.cardDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.green,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
    fontFamily: 'System',
  },
  userEmail: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.blackLight,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.green,
    fontFamily: 'System',
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    fontFamily: 'System',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 16,
    fontFamily: 'System',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  completedCard: {
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  completedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
    fontFamily: 'System',
  },
  completedDate: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
});

