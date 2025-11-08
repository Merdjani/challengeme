import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

export default function TaskCard({ task, onPress }) {
  const progress = (task.currentDay / task.duration) * 100;

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.taskName}>{task.name}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{task.status === 'in-progress' ? 'In Progress' : 'Completed'}</Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <LinearGradient
              colors={[colors.green, colors.greenLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBar, { width: `${progress}%` }]}
            />
          </View>
        </View>
        
        <Text style={styles.progressText}>
          Day {task.currentDay}/{task.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardDark,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  cardContent: {
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    flex: 1,
    fontFamily: 'System',
  },
  statusBadge: {
    backgroundColor: colors.greenDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
    fontFamily: 'System',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: colors.blackLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    fontFamily: 'System',
  },
});

