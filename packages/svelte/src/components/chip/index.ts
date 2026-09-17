export { default as Chip } from './chip.svelte'
export { default as ChipGroup } from './chip-group.svelte'
export type { ChipProps } from './chip.svelte'
export type { ChipGroupProps } from './chip-group.svelte'

export interface ChipGroupHandle {
  clearAll: () => void
}
