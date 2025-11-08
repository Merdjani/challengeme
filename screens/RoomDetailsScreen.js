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
import { colors } from '../theme/colors';

export default function RoomDetailsScreen({ route, navigation }) {
  const { room } = route.params || {
    room: { id: '1', name: 'Fitness Challenge', members: 5, activeTasks: 3 },
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{room.name}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <Ionicons name="people" size={32} color={colors.green} />
              <Text style={styles.infoLabel}>Members</Text>
              <Text style={styles.infoValue}>{room.members}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="list" size={32} color={colors.green} />
              <Text style={styles.infoLabel}>Active Tasks</Text>
              <Text style={styles.infoValue}>{room.activeTasks}</Text>
            </View>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'System',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  infoSection: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.cardDark,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 12,
    fontFamily: 'System',
  },
  infoValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.green,
    marginTop: 8,
    fontFamily: 'System',
  },
});

