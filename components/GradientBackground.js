import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

export default function GradientBackground({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});

