import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native'
import type { Tokens } from '../../tokens'

export type ButtonVariant =
  | 'primary'
  | 'primary-outline'
  | 'secondary'
  | 'soft'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'light'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'

// Static, token-independent — safe to build once with StyleSheet.create.
const buttonSizeStyles: Record<ButtonSize, ViewStyle> = StyleSheet.create({
  sm: { height: 32, paddingHorizontal: 16, gap: 4, borderRadius: 12 },
  md: { height: 40, paddingHorizontal: 20, gap: 6, borderRadius: 14 },
  lg: { height: 48, paddingHorizontal: 24, gap: 8, borderRadius: 16 },
  'icon-sm': { height: 32, width: 32, paddingHorizontal: 0, borderRadius: 12 },
  'icon-md': { height: 40, width: 40, paddingHorizontal: 0, borderRadius: 14 },
  'icon-lg': { height: 48, width: 48, paddingHorizontal: 0, borderRadius: 16 },
})

const buttonSizeTextStyles: Record<ButtonSize, TextStyle> = StyleSheet.create({
  sm: { fontSize: 12 },
  md: { fontSize: 14 },
  lg: { fontSize: 16 },
  'icon-sm': { fontSize: 14 },
  'icon-md': { fontSize: 14 },
  'icon-lg': { fontSize: 16 },
})

// Color-dependent — resolved per render from the active theme's tokens, since RN has no
// CSS-variable-driven automatic dark-mode swap the way the web package does.
function getButtonVariantStyles(tokens: Tokens): Record<ButtonVariant, ViewStyle> {
  const { colors } = tokens
  return {
    primary: { backgroundColor: colors.primary },
    'primary-outline': { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
    secondary: { backgroundColor: colors.secondary },
    soft: { backgroundColor: colors.backgroundMuted },
    outline: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
    ghost: { backgroundColor: 'transparent' },
    destructive: { backgroundColor: colors.error },
    light: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  }
}

function getButtonVariantTextStyles(tokens: Tokens): Record<ButtonVariant, TextStyle> {
  const { colors } = tokens
  return {
    primary: { color: colors.primaryForeground },
    'primary-outline': { color: colors.primary },
    secondary: { color: colors.secondaryForeground },
    soft: { color: colors.foregroundEmphasis },
    outline: { color: colors.foregroundEmphasis },
    ghost: { color: colors.foregroundEmphasis },
    destructive: { color: colors.errorForeground },
    light: { color: '#ffffff' },
  }
}

export { buttonSizeStyles, buttonSizeTextStyles, getButtonVariantStyles, getButtonVariantTextStyles }
