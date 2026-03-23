import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { theme } from '../styles/theme';

export function AppHeader({ title }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.spacer} />

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setIsMenuOpen((currentValue) => !currentValue)}
          style={styles.profileButton}>
          <Ionicons name="person-outline" size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {isMenuOpen ? (
        <View style={styles.menu}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              setIsMenuOpen(false);
              router.replace('/login');
            }}
            style={styles.menuItem}>
            <Text style={styles.menuItemDanger}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsMenuOpen(false)}
            style={styles.menuItem}>
            <Text style={styles.menuItemText}>X Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacer: {
    height: 44,
    width: 44,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  menu: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    marginTop: theme.spacing.sm,
    minWidth: 148,
    overflow: 'hidden',
  },
  menuItem: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  menuItemText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  menuItemDanger: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
