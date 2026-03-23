import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { theme } from '../styles/theme';

export default function PedidoFinalScreen() {
  const router = useRouter();

  return (
    <ScreenContainer title="Pedido final" showHeader showFooter currentRoute="/pedido-final">
      <View style={styles.ticketCard}>
        <Text style={styles.ticketLabel}>Senha de retirada</Text>
        <Text style={styles.ticketValue}>A-024</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton title="Voltar para pagamento" variant="secondary" onPress={() => router.push('/pagamento')} />
        <PrimaryButton title="Reiniciar fluxo" onPress={() => router.push('/login')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  ticketCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.xl,
  },
  ticketLabel: {
    color: theme.colors.textMuted,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  ticketValue: {
    color: theme.colors.primary,
    fontSize: 42,
    fontWeight: '800',
    marginTop: theme.spacing.sm,
  },
  actions: {
    gap: theme.spacing.sm,
  },
});
