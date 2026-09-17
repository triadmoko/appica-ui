<script lang="ts">
  import { DirectionProvider, Field, FieldError, FieldLabel, Radio, RadioGroup, Switch } from '@appica/ui-svelte'

  let channel = $state('email')
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Radio</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Vertical</p>
    <RadioGroup bind:value={channel} aria-label="Channel">
      <label class="flex items-center gap-2 text-sm">
        <Radio value="email" />
        Email
      </label>
      <label class="flex items-center gap-2 text-sm">
        <Radio value="sms" />
        SMS
      </label>
      <label class="flex items-center gap-2 text-sm">
        <Radio value="push" />
        Push
      </label>
    </RadioGroup>
    <p class="text-foreground-subtle text-xs">Selected: {channel}</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Horizontal</p>
    <RadioGroup orientation="horizontal" defaultValue="left" aria-label="Alignment">
      <label class="flex items-center gap-2 text-sm">
        <Radio value="left" />
        Left
      </label>
      <label class="flex items-center gap-2 text-sm">
        <Radio value="center" />
        Center
      </label>
      <label class="flex items-center gap-2 text-sm">
        <Radio value="right" />
        Right
      </label>
    </RadioGroup>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled and error</p>
    <div class="flex flex-col gap-4">
      <RadioGroup defaultValue="a" disabled aria-label="Disabled plan">
        <label class="flex items-center gap-2 text-sm">
          <Radio value="a" />
          Starter
        </label>
        <label class="flex items-center gap-2 text-sm">
          <Radio value="b" />
          Pro
        </label>
      </RadioGroup>
      <Field invalid>
        <FieldLabel>Plan</FieldLabel>
        <RadioGroup defaultValue="a" aria-label="Invalid plan">
          <label class="flex items-center gap-2 text-sm">
            <Radio value="a" />
            Starter
          </label>
          <label class="flex items-center gap-2 text-sm">
            <Radio value="b" />
            Pro
          </label>
        </RadioGroup>
        <FieldError>Pick a plan.</FieldError>
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
        <RadioGroup defaultValue="email" aria-label="RTL channel">
          <label class="flex items-center gap-2 text-sm">
            <Radio value="email" />
            Email
          </label>
          <label class="flex items-center gap-2 text-sm">
            <Radio value="sms" />
            SMS
          </label>
        </RadioGroup>
      </div>
    </DirectionProvider>
  </div>
</section>
