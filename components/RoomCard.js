import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function RoomCard({ room, onPress }) {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.roomHeader}>
          <Ionicons name="people-circle" size={32} color={colors.green} />
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>{room.name}</Text>
            <View style={styles.roomStats}>
              <View style={styles.statItem}>
                <Ionicons name="people" size={16} color={colors.textSecondary} />
                <Text style={styles.statText}>{room.members} members</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="list" size={16} color={colors.textSecondary} />
                <Text style={styles.statText}>{room.activeTasks} tasks</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
        </View>
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
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roomInfo: {
    flex: 1,
    gap: 8,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'System',
  },
  roomStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
});

