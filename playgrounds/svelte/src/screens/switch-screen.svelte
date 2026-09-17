<script lang="ts">
  import { DirectionProvider, Field, FieldError, FieldLabel, Switch } from '@appica/ui-svelte'

  let enabled = $state(true)
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Switch</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Usage</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch bind:checked={enabled} />
      Notifications ({enabled ? 'on' : 'off'})
    </label>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-wrap items-center gap-4">
      <Switch size="sm" aria-label="Small" defaultChecked />
      <Switch size="md" aria-label="Medium" defaultChecked />
      <Switch size="lg" aria-label="Large" defaultChecked />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled and error</p>
    <div class="flex flex-col gap-3">
      <label class="flex items-center gap-2 text-sm">
        <Switch disabled />
        Disabled
      </label>
      <Field invalid>
        <FieldLabel>Marketing</FieldLabel>
        <Switch aria-invalid={true} />
        <FieldError>Confirm this setting.</FieldError>
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
      <div {dir}>
        <label class="flex items-center gap-2 text-sm">
          <Switch defaultChecked />
          Notifications
        </label>
      </div>
    </DirectionProvider>
  </div>
</section>
