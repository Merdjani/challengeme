import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlowButton from '../components/GlowButton';
import { colors } from '../theme/colors';

export default function CreateChallengeScreen({ navigation }) {
  const [challengeName, setChallengeName] = useState('');
  const [duration, setDuration] = useState('');

  const handleCreateChallenge = () => {
    if (challengeName.trim() && duration.trim()) {
      // Handle challenge creation logic here
      console.log('Creating challenge:', { challengeName, duration });
      navigation.goBack();
    }
  };

  const handleInviteFriends = () => {
    // Handle invite friends logic here
    console.log('Inviting friends...');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.title}>New Challenge</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.content}>
            <View style={styles.inputSection}>
              <Text style={styles.label}>Challenge Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Read a book"
                  placeholderTextColor={colors.textSecondary}
                  value={challengeName}
                  onChangeText={setChallengeName}
                />
                <TouchableOpacity style={styles.inputIcon}>
                  <Ionicons name="ellipsis-vertical" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Duration (Days)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 50"
                  placeholderTextColor={colors.textSecondary}
                  value={duration}
                  onChangeText={setDuration}
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.inputIcon}>
                  <Ionicons name="ellipsis-vertical" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonSection}>
              <GlowButton
                title="Create Challenge"
                onPress={handleCreateChallenge}
                style={styles.createButton}
              />
              <GlowButton
                title="Invite Friends"
                onPress={handleInviteFriends}
                variant="secondary"
                style={styles.inviteButton}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
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
  keyboardView: {
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
    color: colors.white,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'System',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'center',
  },
  inputSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 12,
    fontFamily: 'System',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardDark,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: colors.blackLight,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.white,
    paddingVertical: 0,
    fontFamily: 'System',
  },
  inputIcon: {
    padding: 8,
  },
  buttonSection: {
    marginTop: 40,
    gap: 16,
  },
  createButton: {
    width: '100%',
  },
  inviteButton: {
    width: '100%',
  },
});

