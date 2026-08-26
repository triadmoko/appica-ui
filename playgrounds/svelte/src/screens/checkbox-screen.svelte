<script lang="ts">
  import { Checkbox, CheckboxGroup } from '@appica/ui-svelte'

  let subscribed = $state(false)
  let toppings = $state(['cheese'])
</script>

<section class="flex flex-col gap-6">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Checkbox</h2>

  <label class="flex items-center gap-2 text-sm">
    <Checkbox bind:checked={subscribed} />
    Subscribe to the newsletter
  </label>

  <label class="flex items-center gap-2 text-sm">
    <Checkbox defaultChecked />
    Default on
  </label>

  <label class="flex items-center gap-2 text-sm">
    <Checkbox indeterminate />
    Mixed
  </label>

  <label class="flex items-center gap-2 text-sm">
    <Checkbox disabled />
    Disabled
  </label>

  <label class="flex items-center gap-2 text-sm">
    <Checkbox aria-invalid={true} />
    Invalid
  </label>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Group ({toppings.join(', ') || 'none'})</p>
    <CheckboxGroup bind:value={toppings} aria-label="Toppings">
      <label class="flex items-center gap-2 text-sm">
        <Checkbox value="cheese" />
        Cheese
      </label>
      <label class="flex items-center gap-2 text-sm">
        <Checkbox value="bacon" />
        Bacon
      </label>
      <label class="flex items-center gap-2 text-sm">
        <Checkbox value="onion" />
        Onion
      </label>
    </CheckboxGroup>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Horizontal group</p>
    <CheckboxGroup orientation="horizontal" defaultValue={['sms']} aria-label="Channels">
      <label class="flex items-center gap-2 text-sm">
        <Checkbox value="email" />
        Email
      </label>
      <label class="flex items-center gap-2 text-sm">
        <Checkbox value="sms" />
        SMS
      </label>
    </CheckboxGroup>
  </div>
</section>
