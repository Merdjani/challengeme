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

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    // TODO: Replace with actual API call
    setTimeout(() => {
      setNotifications([
        {
          id: '1',
          type: 'invitation',
          title: 'New Challenge Invitation',
          message: 'You have been invited to join "30-Day Fitness Challenge"',
          read: false,
          targetId: '1',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'comment',
          title: 'New Comment',
          message: 'User commented on your challenge',
          read: false,
          targetId: '1',
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          type: 'completion',
          title: 'Challenge Completed',
          message: 'Congratulations! You completed "Read 10 Pages Daily"',
          read: true,
          targetId: '2',
          createdAt: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleNotificationPress = (notification) => {
    // Navigate based on notification type
    if (notification.type === 'invitation' || notification.type === 'comment') {
      navigation.navigate('ChallengeDetail', { challengeId: notification.targetId });
    }
    // Mark as read
    setNotifications(notifications.map(n =>
      n.id === notification.id ? { ...n, read: true } : n
    ));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'invitation':
        return 'mail';
      case 'comment':
        return 'chatbubble';
      case 'completion':
        return 'trophy';
      default:
        return 'notifications';
    }
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
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity onPress={loadNotifications}>
            <Ionicons name="refresh" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.notificationItemUnread,
                ]}
                onPress={() => handleNotificationPress(notification)}
              >
                <View style={styles.notificationIcon}>
                  <Ionicons
                    name={getNotificationIcon(notification.type)}
                    size={24}
                    color={colors.green}
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                {!notification.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="notifications-off-outline" size={64} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No notifications</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  notificationItemUnread: {
    borderColor: colors.green,
    borderWidth: 2,
  },
  notificationIcon: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
    fontFamily: 'System',
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    fontFamily: 'System',
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.green,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 16,
    fontFamily: 'System',
  },
});

