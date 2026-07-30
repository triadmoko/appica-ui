import * as React from 'react'
import { useColorScheme } from 'react-native'
import { darkTokens, lightTokens, type Tokens } from '../../tokens'

export type ColorScheme = 'light' | 'dark'

export interface ThemeContextValue {
  colorScheme: ColorScheme
  tokens: Tokens
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export interface ThemeProviderProps {
  /** Force a color scheme instead of following the device setting — useful for tests/previews. */
  colorScheme?: ColorScheme
  children: React.ReactNode
}

function ThemeProvider({ colorScheme, children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme()
  const resolvedColorScheme: ColorScheme = colorScheme ?? (systemColorScheme === 'dark' ? 'dark' : 'light')
  const value: ThemeContextValue = {
    colorScheme: resolvedColorScheme,
    tokens: resolvedColorScheme === 'dark' ? darkTokens : lightTokens,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function useThemeContext(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  // Inert fallback so components work without a mounted <ThemeProvider>.
  return context ?? { colorScheme: 'light', tokens: lightTokens }
}

export { ThemeProvider, useThemeContext }
