import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function ChallengeCard({ challenge, onPress, onJoin }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return colors.green;
      case 'medium':
        return '#ffa726';
      case 'hard':
        return '#ef5350';
      default:
        return colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) }]}>
              <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
            </View>
            <Text style={styles.categoryText}>{challenge.category}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>

        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {challenge.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.participantsContainer}>
            <Ionicons name="people" size={16} color={colors.textSecondary} />
            <Text style={styles.participantsText}>{challenge.participants} participants</Text>
          </View>
          {onJoin && (
            <TouchableOpacity
              style={styles.joinButton}
              onPress={(e) => {
                e.stopPropagation();
                onJoin();
              }}
            >
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardDark,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
    fontFamily: 'System',
    textTransform: 'capitalize',
  },
  categoryText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'System',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
    fontFamily: 'System',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    fontFamily: 'System',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  participantsText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  joinButton: {
    backgroundColor: colors.green,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
  },
});
