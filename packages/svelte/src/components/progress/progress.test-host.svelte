<script lang="ts">
  import Progress from './progress.svelte'
  import ProgressLabel from './progress-label.svelte'
  import ProgressValue from './progress-value.svelte'
  import type { ProgressVariant } from './progress-context'

  let {
    value = 0,
    variant = 'bar',
    size,
    thickness,
    indicatorColor,
    min,
    max,
    class: className,
    showLabel = false,
    label = 'Loading',
    showValue = false,
  }: {
    value?: number | null
    variant?: ProgressVariant
    size?: number
    thickness?: number
    indicatorColor?: string
    min?: number
    max?: number
    class?: string
    showLabel?: boolean
    label?: string
    showValue?: boolean
  } = $props()
</script>

<Progress {value} {variant} {size} {thickness} {indicatorColor} {min} {max} class={className}>
  {#if showLabel}
    <ProgressLabel>{label}</ProgressLabel>
  {/if}
  {#if showValue}
    <ProgressValue />
  {/if}
</Progress>
