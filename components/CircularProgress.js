import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';

export default function CircularProgress({ current, total, size = 200 }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = current / total;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={colors.green} />
            <Stop offset="100%" stopColor={colors.greenLight} />
          </LinearGradient>
        </Defs>
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.progressNumber}>{current}/{total}</Text>
        <Text style={styles.progressLabel}>Days Complete</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.white,
    fontFamily: 'System',
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    fontFamily: 'System',
  },
});

