<script lang="ts">
  import { DirectionProvider, Field, FieldError, FieldLabel, NumberField, Switch } from '@appica/ui-svelte'

  const variants = ['outline', 'soft'] as const
  const sizes = ['sm', 'md', 'lg'] as const

  let qty = $state<number | null>(3)
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">NumberField</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Variants</p>
    <div class="flex flex-wrap items-center gap-3">
      {#each variants as variant (variant)}
        <NumberField {variant} defaultValue={12} aria-label={variant} />
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-wrap items-center gap-3">
      {#each sizes as size (size)}
        <NumberField {size} defaultValue={8} aria-label={size} />
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Min, max, and step</p>
    <NumberField defaultValue={10} min={0} max={100} step={5} aria-label="Stepped quantity" />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Formatting</p>
    <div class="flex flex-wrap items-center gap-3">
      <NumberField defaultValue={19.99} format={{ style: 'currency', currency: 'USD' }} aria-label="Price" />
      <NumberField defaultValue={0.42} format={{ style: 'percent' }} step={0.01} aria-label="Percent" />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Controlled</p>
    <Field class="w-fit">
      <FieldLabel>Quantity ({qty ?? 'empty'})</FieldLabel>
      <NumberField bind:value={qty} min={0} max={99} />
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled and error</p>
    <div class="flex flex-wrap items-center gap-3">
      <NumberField disabled defaultValue={4} aria-label="Disabled" />
      <Field invalid>
        <NumberField defaultValue={0} aria-label="Invalid quantity" />
        <FieldError>Must be at least 1.</FieldError>
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
        <NumberField defaultValue={12} aria-label="RTL quantity" />
      </div>
    </DirectionProvider>
  </div>
</section>
