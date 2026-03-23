import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../styles/theme';

export function InfoCard({ title, description }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    gap: theme.spacing.xs,
    padding: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
});
