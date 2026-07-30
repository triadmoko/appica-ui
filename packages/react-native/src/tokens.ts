// Hand-mirrored subset of packages/react/styles.css's CSS-variable tokens (OKLCH values
// converted to hex — RN's core style engine doesn't parse oklch() without a third-party
// runtime, and pulling one in isn't justified for this small a token set). Scoped to what
// currently-shipped RN components consume — Button, at this point. Extend as new components
// land; do not port the full web token set speculatively.
//
// Radii are pixel numbers derived from the web scale (--radius: 0.875rem, 1rem = 16px).

export interface ColorTokens {
  foregroundEmphasis: string
  foregroundIntense: string
  background: string
  backgroundSubtle: string
  backgroundMuted: string
  border: string
  borderStrong: string
  primary: string
  primaryMuted: string
  primaryForeground: string
  secondary: string
  secondaryMuted: string
  secondaryForeground: string
  error: string
  errorMuted: string
  errorForeground: string
}

export interface RadiusTokens {
  sm: number
  md: number
  lg: number
}

export interface Tokens {
  colors: ColorTokens
  radius: RadiusTokens
  opacityDisabled: number
}

const radius: RadiusTokens = { sm: 12, md: 14, lg: 16 }
const opacityDisabled = 0.65

export const lightTokens: Tokens = {
  colors: {
    foregroundEmphasis: '#1e2939',
    foregroundIntense: '#101828',
    background: '#ffffff',
    backgroundSubtle: '#f9fafb',
    backgroundMuted: '#f3f4f6',
    border: '#e5e7eb',
    borderStrong: '#d1d5dc',
    primary: '#101828',
    primaryMuted: '#364153',
    primaryForeground: '#ffffff',
    secondary: '#8ec5ff',
    secondaryMuted: '#bedbff',
    secondaryForeground: '#030712',
    error: '#ffa2a2',
    errorMuted: '#ffc9c9',
    errorForeground: '#030712',
  },
  radius,
  opacityDisabled,
}

export const darkTokens: Tokens = {
  colors: {
    foregroundEmphasis: '#f3f4f6',
    foregroundIntense: '#ffffff',
    background: '#030712',
    backgroundSubtle: '#6a728214',
    backgroundMuted: '#101828',
    border: '#1e2939',
    borderStrong: '#364153',
    primary: '#ffffff',
    primaryMuted: '#e5e7eb',
    primaryForeground: '#101828',
    secondary: '#51a2ff',
    secondaryMuted: '#8ec5ff',
    secondaryForeground: '#030712',
    error: '#ff6467',
    errorMuted: '#ffa2a2',
    errorForeground: '#030712',
  },
  radius,
  opacityDisabled,
}
