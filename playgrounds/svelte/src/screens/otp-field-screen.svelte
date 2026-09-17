<script lang="ts">
  import {
    DirectionProvider,
    Field,
    FieldError,
    FieldLabel,
    OTPField,
    OTPFieldInput,
    OTPFieldSeparator,
    Switch,
  } from '@appica/ui-svelte'

  const variants = ['outline', 'soft'] as const
  const sizes = ['sm', 'md', 'lg'] as const

  let code = $state('')
  let verified = $state('')
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">OTPField</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Variants</p>
    <div class="flex flex-col gap-3">
      {#each variants as variant (variant)}
        <OTPField {variant} length={6} aria-label={variant}>
          {#snippet children({ cells })}
            {#each cells as cell, index (index)}
              <OTPFieldInput {cell} />
            {/each}
          {/snippet}
        </OTPField>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-col gap-3">
      {#each sizes as size (size)}
        <OTPField {size} length={4} aria-label={size}>
          {#snippet children({ cells })}
            {#each cells as cell, index (index)}
              <OTPFieldInput {cell} />
            {/each}
          {/snippet}
        </OTPField>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Separator</p>
    <OTPField length={6} aria-label="Code with separator">
      {#snippet children({ cells })}
        {#each cells as cell, index (index)}
          {#if index === 3}
            <OTPFieldSeparator />
          {/if}
          <OTPFieldInput {cell} />
        {/each}
      {/snippet}
    </OTPField>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Placeholder</p>
    <OTPField length={6} placeholder="0" aria-label="Placeholder code">
      {#snippet children({ cells })}
        {#each cells as cell, index (index)}
          <OTPFieldInput {cell} />
        {/each}
      {/snippet}
    </OTPField>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Masked</p>
    <OTPField length={6} type="password" aria-label="Masked code">
      {#snippet children({ cells })}
        {#each cells as cell, index (index)}
          <OTPFieldInput {cell} />
        {/each}
      {/snippet}
    </OTPField>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Controlled verify</p>
    <Field>
      <FieldLabel>Verification code {code ? `(${code})` : ''}</FieldLabel>
      <OTPField bind:value={code} length={6} onComplete={(next) => (verified = next)} aria-label="Verification code">
        {#snippet children({ cells })}
          {#each cells as cell, index (index)}
            {#if index === 3}
              <OTPFieldSeparator />
            {/if}
            <OTPFieldInput {cell} />
          {/each}
        {/snippet}
      </OTPField>
    </Field>
    {#if verified}
      <p class="text-foreground-muted text-sm">Completed: {verified}</p>
    {/if}
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled, read-only, error</p>
    <div class="flex flex-col gap-3">
      <OTPField length={4} disabled defaultValue="1234" aria-label="Disabled code">
        {#snippet children({ cells })}
          {#each cells as cell, index (index)}
            <OTPFieldInput {cell} />
          {/each}
        {/snippet}
      </OTPField>
      <OTPField length={4} readonly defaultValue="5678" aria-label="Read-only code">
        {#snippet children({ cells })}
          {#each cells as cell, index (index)}
            <OTPFieldInput {cell} />
          {/each}
        {/snippet}
      </OTPField>
      <Field invalid>
        <OTPField length={4} defaultValue="0000" aria-label="Invalid code">
          {#snippet children({ cells })}
            {#each cells as cell, index (index)}
              <OTPFieldInput {cell} />
            {/each}
          {/snippet}
        </OTPField>
        <FieldError>That code is expired.</FieldError>
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
        <OTPField length={6} aria-label="RTL code">
          {#snippet children({ cells })}
            {#each cells as cell, index (index)}
              {#if index === 3}
                <OTPFieldSeparator />
              {/if}
              <OTPFieldInput {cell} />
            {/each}
          {/snippet}
        </OTPField>
      </div>
    </DirectionProvider>
  </div>
</section>
