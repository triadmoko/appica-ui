<script lang="ts">
  import {
    DirectionProvider,
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    FieldValidity,
    Fieldset,
    FieldsetLegend,
    Input,
    Switch,
    Textarea,
  } from '@appica/ui-svelte'

  let dir: 'ltr' | 'rtl' = $state('ltr')

  function uniqueUsername(value: unknown) {
    const username = String(value ?? '').trim()
    if (!username) return 'Username is required'
    if (username === 'admin') return 'That username is taken'
    return null
  }
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Field</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Default</p>
    <Field class="max-w-sm">
      <FieldLabel>Name</FieldLabel>
      <Input placeholder="Ada Lovelace" />
      <FieldDescription>Shown under the control via aria-describedby.</FieldDescription>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Validation</p>
    <Field class="max-w-sm" name="username" validate={uniqueUsername} validationMode="onBlur">
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="ada" required />
      <FieldError match="valueMissing">Username is required.</FieldError>
      <FieldError />
      <FieldValidity>
        {#snippet children(state)}
          <p class="text-foreground-subtle text-xs">
            value={String(state.value ?? '')} valid={String(state.valid)}
          </p>
        {/snippet}
      </FieldValidity>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled and read-only</p>
    <div class="flex max-w-sm flex-col gap-4">
      <Field disabled>
        <FieldLabel>Workspace</FieldLabel>
        <Input value="appica" />
        <FieldDescription>Inherited by the control.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Plan</FieldLabel>
        <Input readonly value="Pro" />
      </Field>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Fieldset</p>
    <Fieldset class="max-w-sm">
      <FieldsetLegend>Profile</FieldsetLegend>
      <Field>
        <FieldLabel>Display name</FieldLabel>
        <Input placeholder="Ada" />
      </Field>
      <Field>
        <FieldLabel>Bio</FieldLabel>
        <Textarea rows={3} placeholder="A short bio" />
      </Field>
    </Fieldset>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <Field class="max-w-sm">
          <FieldLabel>Name</FieldLabel>
          <Input placeholder="Ada Lovelace" />
          <FieldDescription>Label and description flip with the field.</FieldDescription>
        </Field>
      </div>
    </DirectionProvider>
  </div>
</section>
