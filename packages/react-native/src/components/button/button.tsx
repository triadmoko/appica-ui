import * as React from 'react'
import { Pressable, StyleSheet, Text, type PressableProps, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'
import { useTheme } from '../../hooks/use-theme'
import {
  buttonSizeStyles,
  buttonSizeTextStyles,
  getButtonVariantStyles,
  getButtonVariantTextStyles,
  type ButtonSize,
  type ButtonVariant,
} from './button-variants'

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  /** Escape hatch for the inner label `Text` — folded single-element component, see AGENTS.md. */
  textStyle?: StyleProp<TextStyle>
  children: React.ReactNode
}

function Button({ variant = 'primary', size = 'md', disabled, style, textStyle, children, ...props }: ButtonProps) {
  const { tokens } = useTheme()
  const variantStyles = getButtonVariantStyles(tokens)
  const variantTextStyles = getButtonVariantTextStyles(tokens)

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        buttonSizeStyles[size],
        variantStyles[variant],
        pressed && styles.pressed,
        disabled && { opacity: tokens.opacityDisabled },
        style,
      ]}
      {...props}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={[styles.text, buttonSizeTextStyles[size], variantTextStyles[variant], textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    fontWeight: '500',
  },
})

export { Button }
