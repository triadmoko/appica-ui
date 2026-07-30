import { useThemeContext, type ThemeContextValue } from '../providers/theme-provider/theme-provider'

export type UseThemeReturn = ThemeContextValue

/**
 * Read the active color scheme and its resolved design tokens. Returns inert
 * light-mode values with no `<ThemeProvider>` mounted.
 */
export function useTheme(): UseThemeReturn {
  return useThemeContext()
}
