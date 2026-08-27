<script lang="ts">
  import { CalendarDate, type DateValue } from '@internationalized/date'
  import { DateField, Field, FieldError, FieldLabel } from '@appica/ui-svelte'

  let dob = $state<DateValue | undefined>(new CalendarDate(1994, 6, 23))
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Date field</h2>

  <Field class="max-w-xs" name="dob">
    <FieldLabel>Date of birth</FieldLabel>
    <DateField bind:value={dob} />
  </Field>
  <p class="text-foreground-subtle text-sm">Value: {dob?.toString() ?? 'none'}</p>

  <div class="flex max-w-xs flex-col gap-2">
    <p class="text-foreground-muted text-sm">Soft large</p>
    <DateField variant="soft" size="lg" defaultValue={new CalendarDate(2026, 8, 27)} />
  </div>

  <Field class="max-w-xs" invalid>
    <FieldLabel>Invalid</FieldLabel>
    <DateField />
    <FieldError>Enter a valid date.</FieldError>
  </Field>

  <div class="flex max-w-xs flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <DateField disabled defaultValue={new CalendarDate(2026, 1, 1)} />
  </div>
</section>
