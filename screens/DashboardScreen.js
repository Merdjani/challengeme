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
import { colors } from '../theme/colors';
import TaskCard from '../components/TaskCard';
import RoomCard from '../components/RoomCard';

export default function DashboardScreen({ navigation }) {
  const [tasks] = useState([
    { id: '1', name: 'Read 10 Pages Daily', currentDay: 7, duration: 10, status: 'in-progress' },
    { id: '2', name: 'Meditate 15 Min', currentDay: 9, duration: 10, status: 'in-progress' },
    { id: '3', name: 'Run 5K Every Other Day', currentDay: 5, duration: 10, status: 'in-progress' },
  ]);

  const [rooms] = useState([
    { id: '1', name: 'Fitness Challenge', members: 5, activeTasks: 3 },
    { id: '2', name: 'Reading Club', members: 8, activeTasks: 5 },
    { id: '3', name: 'Meditation Group', members: 4, activeTasks: 2 },
  ]);

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetails', { task });
  };

  const handleRoomPress = (room) => {
    navigation.navigate('RoomDetails', { room });
  };

  const handleCreateRoom = () => {
    // Handle create room logic
    console.log('Create room');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateChallenge')}
          >
            <Ionicons name="add-circle" size={32} color={colors.green} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Tasks Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="list" size={24} color={colors.green} />
              <Text style={styles.sectionTitle}>My Tasks</Text>
            </View>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onPress={() => handleTaskPress(task)}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No tasks yet. Create one to get started!</Text>
              </View>
            )}
          </View>

          {/* Rooms Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="people" size={24} color={colors.green} />
              <Text style={styles.sectionTitle}>My Rooms</Text>
            </View>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onPress={() => handleRoomPress(room)}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No rooms yet. Join or create one!</Text>
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
  addButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'System',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'System',
  },
});

