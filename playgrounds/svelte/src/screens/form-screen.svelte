<script lang="ts">
  import {
    Button,
    DirectionProvider,
    Field,
    FieldError,
    FieldLabel,
    Form,
    Input,
    Switch,
    type FormErrors,
    type FormHandle,
    type FormValues,
  } from '@appica/ui-svelte'

  let account = $state<FormValues | null>(null)
  let validated = $state<FormValues | null>(null)
  let errors: FormErrors = $state({})
  let dir: 'ltr' | 'rtl' = $state('ltr')
  let form: FormHandle | undefined = $state()

  function requireEmail(value: unknown) {
    const email = String(value ?? '')
    if (!email) return 'Email is required'
    if (!email.includes('@')) return 'Enter a valid email'
    return null
  }

  function requirePassword(value: unknown) {
    const password = String(value ?? '')
    if (password.length < 8) return 'Use at least 8 characters'
    return null
  }

  function onServerSubmit(values: FormValues) {
    const email = String(values.email ?? '')
    if (email === 'taken@example.com') {
      errors = { email: 'That email is already taken.' }
      return
    }
    errors = {}
    account = values
  }
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Form</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Default</p>
    <Form
      class="flex max-w-sm flex-col gap-3"
      onFormSubmit={(values) => {
        validated = values
      }}
    >
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Ada Lovelace" />
      </Field>
      <Button type="submit">Create account</Button>
    </Form>
    {#if validated}
      <p class="text-foreground-muted text-sm">Submitted {String(validated.name)}</p>
    {/if}
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Validation</p>
    <Form class="flex max-w-sm flex-col gap-3" validationMode="onBlur" bind:this={form}>
      <Field name="email" validate={requireEmail} class="data-invalid:animate-shake">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="ada@example.com" />
        <FieldError />
      </Field>
      <Field name="password" validate={requirePassword} class="data-invalid:animate-shake">
        <FieldLabel>Password</FieldLabel>
        <Input type="password" placeholder="••••••••" />
        <FieldError />
      </Field>
      <div class="flex gap-2">
        <Button type="submit">Sign in</Button>
        <Button variant="outline" type="button" onclick={() => void form?.validate()}>Validate</Button>
      </div>
    </Form>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Server-side errors</p>
    <Form
      class="flex max-w-sm flex-col gap-3"
      {errors}
      onClearErrors={(next) => (errors = next)}
      onFormSubmit={onServerSubmit}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="taken@example.com" />
        <FieldError />
      </Field>
      <Button type="submit">Continue</Button>
    </Form>
    {#if account}
      <p class="text-foreground-muted text-sm">Created {String(account.email)}</p>
    {/if}
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <Form class="flex max-w-sm flex-col gap-3" onFormSubmit={() => undefined}>
          <Field name="name">
            <FieldLabel>Name</FieldLabel>
            <Input placeholder="Ada Lovelace" />
          </Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </DirectionProvider>
  </div>
</section>
