import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { authService } from '../services/authService';

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const authData = await authService.getAuthData();
    if (authData) {
      setUser(authData.user);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await authService.logout();
            navigation.replace('AuthStack');
          },
        },
      ]
    );
  };

  const handleChangePassword = () => {
    // TODO: Implement change password
    Alert.alert('Coming Soon', 'Password change feature will be available soon');
  };

  const handleEditProfile = () => {
    // TODO: Implement edit profile
    Alert.alert('Coming Soon', 'Edit profile feature will be available soon');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
              <View style={styles.settingLeft}>
                <Ionicons name="person-outline" size={24} color={colors.green} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Edit Profile</Text>
                  <Text style={styles.settingValue}>{user?.name || 'User'}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
              <View style={styles.settingLeft}>
                <Ionicons name="lock-closed-outline" size={24} color={colors.green} />
                <Text style={styles.settingLabel}>Change Password</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications-outline" size={24} color={colors.green} />
                <Text style={styles.settingLabel}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.blackLight, true: colors.green }}
                thumbColor={colors.white}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="information-circle-outline" size={24} color={colors.green} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Version</Text>
                  <Text style={styles.settingValue}>1.0.0</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#ef5350" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
    fontFamily: 'System',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 12,
    fontFamily: 'System',
  },
  settingValue: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
    fontFamily: 'System',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    padding: 16,
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#ef5350',
    gap: 12,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ef5350',
    fontFamily: 'System',
  },
});

