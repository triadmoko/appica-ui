<script lang="ts">
  import { DirectionProvider, Radio, RadioGroup, Switch } from '@appica/ui-svelte'

  const plans = [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'team', label: 'Team' },
  ]

  const sizes = [
    { value: 's', label: 'Small' },
    { value: 'm', label: 'Medium' },
    { value: 'l', label: 'Large' },
  ]

  const visibilities = [
    { value: 'public', label: 'Public', description: 'Anyone on the internet can see this project.' },
    { value: 'private', label: 'Private', description: 'Only you and people you invite can access it.' },
    { value: 'team', label: 'Team', description: 'Everyone in your organization can view and edit.' },
  ]

  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Radio</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Default</p>
    <RadioGroup defaultValue="pro" aria-labelledby="plan-label">
      <span id="plan-label" class="text-foreground mb-1 text-sm font-medium">Plan</span>
      {#each plans as plan (plan.value)}
        <label class="flex items-center gap-2 text-sm select-none">
          <Radio value={plan.value} />
          {plan.label}
        </label>
      {/each}
    </RadioGroup>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Horizontal</p>
    <RadioGroup orientation="horizontal" defaultValue="m" aria-label="Size">
      {#each sizes as size (size.value)}
        <label class="flex items-center gap-2 text-sm select-none">
          <Radio value={size.value} />
          {size.label}
        </label>
      {/each}
    </RadioGroup>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Sizing</p>
    <RadioGroup defaultValue="base" aria-label="Size" class="items-start gap-4 select-none">
      <label class="flex items-center gap-2 text-base">
        <Radio value="base" />
        text-base
      </label>
      <label class="flex items-center gap-2.5 text-lg">
        <Radio value="lg" />
        text-lg
      </label>
      <label class="flex items-center gap-3 text-xl">
        <Radio value="xl" />
        text-xl
      </label>
    </RadioGroup>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <div class="flex flex-col gap-8">
      <RadioGroup defaultValue="standard" aria-label="Shipping">
        <label class="flex items-center gap-2 text-sm select-none">
          <Radio value="standard" />
          Standard
        </label>
        <label class="flex items-center gap-2 text-sm select-none">
          <Radio value="express" />
          Express
        </label>
        <label class="text-foreground-muted flex items-center gap-2 text-sm select-none">
          <Radio value="overnight" disabled />
          Overnight (unavailable)
        </label>
      </RadioGroup>

      <RadioGroup defaultValue="yearly" disabled aria-label="Billing period">
        <label class="text-foreground-muted flex items-center gap-2 text-sm select-none">
          <Radio value="monthly" />
          Monthly
        </label>
        <label class="text-foreground-muted flex items-center gap-2 text-sm select-none">
          <Radio value="yearly" />
          Yearly
        </label>
      </RadioGroup>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">With descriptions</p>
    <RadioGroup defaultValue="private" aria-label="Visibility" class="max-w-md">
      {#each visibilities as visibility (visibility.value)}
        <label class="flex items-start gap-2.5 select-none">
          <Radio value={visibility.value} class="mt-1" />
          <span class="flex flex-col">
            <span class="text-foreground-intense font-medium">{visibility.label}</span>
            <span class="text-foreground-muted text-sm">{visibility.description}</span>
          </span>
        </label>
      {/each}
    </RadioGroup>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <RadioGroup defaultValue="pro" aria-label="Plan">
          {#each plans as plan (plan.value)}
            <label class="flex items-center gap-2 text-sm select-none">
              <Radio value={plan.value} />
              {plan.label}
            </label>
          {/each}
        </RadioGroup>
      </div>
    </DirectionProvider>
  </div>
</section>
