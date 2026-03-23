import { StyleSheet, Text, View } from 'react-native';

import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';
import { theme } from '../styles/theme';

export function ScreenContainer({
  children,
  currentRoute,
  showFooter = false,
  showHeader = false,
  title,
}) {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        {showHeader ? (
          <AppHeader title={title} />
        ) : (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}

        <View style={styles.body}>{children}</View>
      </View>

      {showFooter ? <AppFooter currentRoute={currentRoute} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
    gap: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl + theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: '800',
  },
  body: {
    flex: 1,
    gap: theme.spacing.md,
    justifyContent: 'space-between',
  },
});
