<script lang="ts">
  import { Time } from '@internationalized/date'
  import { DirectionProvider, Field, FieldError, FieldLabel, Switch, TimeField } from '@appica/ui-svelte'

  let start = $state<Time | undefined>(new Time(9, 30))
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">TimeField</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Usage</p>
    <Field class="max-w-xs" name="start">
      <FieldLabel>Start time (24h)</FieldLabel>
      <TimeField bind:value={start} hourCycle={24} />
    </Field>
    <p class="text-foreground-subtle text-xs">Value: {start?.toString() ?? 'none'}</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">12-hour</p>
    <TimeField class="max-w-xs" hourCycle={12} defaultValue={new Time(14, 5)} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Seconds</p>
    <TimeField class="max-w-xs" hourCycle={24} granularity="second" defaultValue={new Time(9, 30, 45)} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled and error</p>
    <div class="flex max-w-xs flex-col gap-3">
      <TimeField hourCycle={24} disabled defaultValue={new Time(9, 0)} />
      <Field invalid>
        <FieldLabel>Invalid</FieldLabel>
        <TimeField hourCycle={24} />
        <FieldError>Enter a valid time.</FieldError>
      </Field>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="max-w-xs">
        <TimeField hourCycle={24} defaultValue={new Time(9, 30)} />
      </div>
    </DirectionProvider>
  </div>
</section>
