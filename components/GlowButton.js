import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

export default function GlowButton({ title, onPress, variant = 'primary', style }) {
  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton, style]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.secondaryButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[colors.green, colors.greenLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.glowEffect} />
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.glowGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 20,
    backgroundColor: colors.glowGreen,
    opacity: 0.3,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    zIndex: 1,
    fontFamily: 'System',
  },
  button: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.green,
  },
  secondaryButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'System',
  },
});

