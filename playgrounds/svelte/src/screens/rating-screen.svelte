<script lang="ts">
  import {
    Button,
    DirectionProvider,
    Field,
    FieldDescription,
    Form,
    Rating,
    Switch,
    Textarea,
  } from '@appica/ui-svelte'

  const LABELS = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent']
  const BREAKDOWN = [
    { label: 'Value for money', score: 4.5 },
    { label: 'Build quality', score: 4 },
    { label: 'Battery life', score: 3.5 },
  ]

  let dir: 'ltr' | 'rtl' = $state('ltr')
  let value = $state(0)
  let preview = $state<number | null>(null)
  let submitted = $state<string | null>(null)
  const shown = $derived(preview ?? value)
</script>

{#snippet heartEmpty()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
{/snippet}
{#snippet heartFilled()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
{/snippet}
{#snippet thumbEmpty()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
{/snippet}
{#snippet thumbFilled()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 10v12H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Zm13.83 0H15l1-4.12A3.13 3.13 0 0 0 13 2l-3.45 6.89A2 2 0 0 1 7.76 10H7v12h10.5a2 2 0 0 0 1.92-1.44l2.33-8A2 2 0 0 0 20.83 10Z" />
  </svg>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Rating</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Default</p>
    <Rating defaultValue={3} aria-label="Rate this product" />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Icons</p>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-4">
        <span class="w-20 text-sm">Star</span>
        <Rating defaultValue={4} aria-label="Star rating" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-20 text-sm">Heart</span>
        <Rating class="text-error-emphasis" defaultValue={4} icon={{ empty: heartEmpty, filled: heartFilled }} aria-label="Heart rating" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-20 text-sm">Thumb up</span>
        <Rating class="text-success-emphasis" defaultValue={4} icon={{ empty: thumbEmpty, filled: thumbFilled }} aria-label="Thumb up rating" />
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Variants</p>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-4">
        <span class="w-16 text-sm">Filled</span>
        <Rating defaultValue={3} aria-label="Filled rating" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-16 text-sm">Outline</span>
        <Rating defaultValue={3} variant="outline" aria-label="Outline rating" />
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Orientation</p>
    <div class="flex items-start gap-10">
      <Rating defaultValue={3} aria-label="Horizontal rating" />
      <Rating defaultValue={3} orientation="vertical" aria-label="Vertical rating" />
      <Rating defaultValue={3.5} step={0.5} orientation="vertical" variant="outline" aria-label="Vertical half-step" />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-col items-start gap-3">
      <Rating defaultValue={4} size={16} aria-label="16px rating" />
      <Rating defaultValue={4} aria-label="Default rating" />
      <Rating defaultValue={4} size={40} aria-label="40px rating" />
      <Rating defaultValue={4} size="1em" class="text-lg" aria-label="Text-relative rating" />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Fractions</p>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-4">
        <span class="w-16 text-sm">Halves</span>
        <Rating defaultValue={3.5} step={0.5} aria-label="Half-step rating" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-16 text-sm">Quarters</span>
        <Rating defaultValue={3.75} step={0.25} aria-label="Quarter-step rating" />
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Color</p>
    <div class="flex flex-col items-start gap-3">
      <Rating defaultValue={4} aria-label="Primary rating" />
      <Rating class="text-warning-emphasis" defaultValue={4} aria-label="Warning rating" />
      <Rating class="text-error-emphasis" defaultValue={4} aria-label="Error rating" />
      <Rating class="text-success-emphasis" defaultValue={4} variant="outline" aria-label="Success rating" />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Read only</p>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <Rating value={4.3} step={0.1} size={32} readOnly />
        <span class="text-sm font-medium">4.3</span>
        <span class="text-foreground-muted text-sm">(1,284 reviews)</span>
      </div>
      <div class="flex flex-col gap-1.5">
        {#each BREAKDOWN as row (row.label)}
          <div class="flex items-center gap-3">
            <span class="text-foreground-muted w-32 text-sm">{row.label}</span>
            <Rating value={row.score} step={0.5} size={16} readOnly />
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Controlled with labels</p>
    <div class="flex flex-col items-center gap-2">
      <span id="feedback-label" class="text-foreground-intense text-sm font-medium">How was your experience?</span>
      <Rating
        {value}
        onValueChange={(next) => (value = next)}
        onHoverChange={(next) => (preview = next)}
        clearable
        size={32}
        aria-labelledby="feedback-label"
      />
      <span class="text-foreground-muted h-5 text-sm">{shown > 0 ? LABELS[Math.ceil(shown) - 1] : ''}</span>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">In a form</p>
    <Form
      class="flex w-full max-w-70 flex-col gap-4"
      onFormSubmit={(values) => {
        submitted = `score=${values.score}`
      }}
    >
      <Field>
        <span id="score-label" class="text-foreground-intense mb-1.5 block text-sm font-medium select-none">
          Rate your stay
        </span>
        <Rating name="score" aria-labelledby="score-label" />
        <FieldDescription class="text-xs">Submits as a hidden input named score.</FieldDescription>
      </Field>
      <Textarea name="comment" rows={2} placeholder="Anything we could do better?" />
      <Button type="submit" class="self-start">Send review</Button>
      {#if submitted}
        <output class="text-foreground-muted font-mono text-xs">{submitted}</output>
      {/if}
    </Form>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <Rating defaultValue={3} aria-label="RTL rating" />
      </div>
    </DirectionProvider>
  </div>
</section>
