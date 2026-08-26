<script lang="ts">
  import ColorPicker from './color-picker.svelte'
  import ColorPickerInput from './color-picker-input.svelte'
  import ColorArea from '../color-area/color-area.svelte'
  import ColorSlider from '../color-slider/color-slider.svelte'
  import ColorSwatch from '../color-swatch/color-swatch.svelte'
  import ColorSwatchPicker from '../color-swatch-picker/color-swatch-picker.svelte'
  import ColorSwatchPickerItem from '../color-swatch-picker/color-swatch-picker-item.svelte'
  import type { Color, ColorFormat } from '../../lib/color'
  import type { ColorPickerSwatchPosition, ColorPickerVariant } from './color-picker.svelte'

  let {
    inline = false,
    alpha = false,
    eyedropper = false,
    disabled = false,
    defaultValue = '#3b82f6',
    value,
    name,
    label,
    swatchPosition,
    variant,
    open,
    hideTrigger = false,
    keepMounted = false,
    panel = 'default',
    inputFormat,
    onValueChange,
    onValueCommitted,
    'aria-label': ariaLabel,
  }: {
    inline?: boolean
    alpha?: boolean
    eyedropper?: boolean
    disabled?: boolean
    defaultValue?: string
    value?: Color | string
    name?: string
    label?: string | null
    swatchPosition?: ColorPickerSwatchPosition
    variant?: ColorPickerVariant
    open?: boolean
    hideTrigger?: boolean
    keepMounted?: boolean
    panel?: 'default' | 'hue' | 'shared' | 'locked-palette' | 'input' | 'input-only'
    inputFormat?: ColorFormat
    onValueChange?: (value: Color) => void
    onValueCommitted?: (value: Color) => void
    'aria-label'?: string
  } = $props()
</script>

<ColorPicker
  data-testid="trigger"
  {inline}
  {alpha}
  {eyedropper}
  {disabled}
  {defaultValue}
  {value}
  {name}
  {label}
  {swatchPosition}
  {variant}
  {open}
  trigger={hideTrigger ? null : undefined}
  popoverProps={keepMounted ? { keepMounted: true } : undefined}
  {onValueChange}
  {onValueCommitted}
  aria-label={ariaLabel}
>
  {#if panel === 'hue'}
    <ColorSlider channel="hue" />
  {:else if panel === 'shared'}
    <ColorSwatch />
    <ColorSlider channel="hue" />
    <ColorSwatchPicker aria-label="Presets">
      <ColorSwatchPickerItem color="#00ff00" />
    </ColorSwatchPicker>
  {:else if panel === 'locked-palette'}
    <ColorSwatch />
    <ColorSwatchPicker aria-label="Presets" value="#ff0000">
      <ColorSwatchPickerItem color="#00ff00" />
    </ColorSwatchPicker>
  {:else if panel === 'input'}
    <ColorSlider channel="hue" />
    <ColorPickerInput />
  {:else if panel === 'input-only'}
    <ColorPickerInput format={inputFormat} />
  {/if}
</ColorPicker>
