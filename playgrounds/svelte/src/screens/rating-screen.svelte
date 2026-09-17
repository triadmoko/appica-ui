<script lang="ts">
  import { DirectionProvider, Rating, Switch } from '@appica/ui-svelte'

  let score = $state(3)
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Rating</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Usage</p>
    <Rating aria-label="Score" bind:value={score} />
    <p class="text-foreground-subtle text-xs">{score} of 5</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Half step</p>
    <Rating aria-label="Half step" step={0.5} value={3.5} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-wrap items-center gap-4">
      <Rating aria-label="Small" size={16} defaultValue={4} />
      <Rating aria-label="Medium" size={24} defaultValue={4} />
      <Rating aria-label="Large" size={32} defaultValue={4} />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Read only</p>
    <Rating readOnly value={4} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <Rating disabled value={2} />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Clearable</p>
    <Rating clearable defaultValue={3} aria-label="Clearable rating" />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <Rating aria-label="RTL score" bind:value={score} />
      </div>
    </DirectionProvider>
  </div>
</section>
