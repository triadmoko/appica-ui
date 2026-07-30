import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Button, ThemeProvider, useTheme, type ButtonVariant, type ButtonSize } from '@appica/ui-react-native'

const VARIANTS: ButtonVariant[] = [
  'primary',
  'primary-outline',
  'secondary',
  'soft',
  'outline',
  'ghost',
  'destructive',
  'light',
]

const SIZES: ButtonSize[] = ['sm', 'md', 'lg']

function ThemeToggle({ colorScheme, onToggle }: { colorScheme: 'light' | 'dark'; onToggle: () => void }) {
  return (
    <Button variant="outline" size="sm" onPress={onToggle} style={{ alignSelf: 'flex-start' }}>
      {`Switch to ${colorScheme === 'light' ? 'dark' : 'light'} mode`}
    </Button>
  )
}

function ButtonGallery() {
  const { tokens, colorScheme } = useTheme()

  return (
    <ScrollView
      style={{ backgroundColor: tokens.colors.background }}
      contentContainerStyle={styles.content}
    >
      {VARIANTS.map((variant) => (
        <View key={variant} style={styles.row}>
          <Text style={[styles.label, { color: tokens.colors.foregroundEmphasis }]}>{variant}</Text>
          <View style={styles.buttonRow}>
            {SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size}
              </Button>
            ))}
            <Button variant={variant} disabled>
              disabled
            </Button>
          </View>
        </View>
      ))}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ScrollView>
  )
}

export default function App() {
  const [forcedScheme, setForcedScheme] = React.useState<'light' | 'dark'>('light')

  return (
    <SafeAreaProvider>
      <ThemeProvider colorScheme={forcedScheme}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.title}>@appica/ui-react-native — Button</Text>
            <ThemeToggle
              colorScheme={forcedScheme}
              onToggle={() => setForcedScheme((s) => (s === 'light' ? 'dark' : 'light'))}
            />
          </View>
          <ButtonGallery />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    gap: 20,
  },
  row: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
})
