<script lang="ts">
  import Meter from './meter.svelte'
  import MeterLabel from './meter-label.svelte'
  import MeterProgress from './meter-progress.svelte'
  import MeterValue from './meter-value.svelte'
  import type { MeterStatusClassNames } from './meter-context'

  let {
    value = 60,
    min,
    max,
    low,
    high,
    optimum,
    statusClassNames,
    class: className,
    showLabel = false,
    label = 'Storage',
    showValue = false,
  }: {
    value?: number
    min?: number
    max?: number
    low?: number
    high?: number
    optimum?: number
    statusClassNames?: MeterStatusClassNames
    class?: string
    showLabel?: boolean
    label?: string
    showValue?: boolean
  } = $props()
</script>

<Meter {value} {min} {max} {low} {high} {optimum} {statusClassNames} class={className}>
  {#if showLabel}
    <MeterLabel>{label}</MeterLabel>
  {/if}
  {#if showValue}
    <MeterValue />
  {/if}
  <MeterProgress />
</Meter>
