<script lang="ts" module>
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { DateValue } from '@internationalized/date'
  import { type DateFieldRootProps, type WithoutChildrenOrChild } from 'bits-ui'
  export type DateFieldVariant = 'outline' | 'soft'
  export type DateFieldSize = 'sm' | 'md' | 'lg'
  export type DateFieldGranularity = 'day' | 'hour' | 'minute' | 'second'

  export type DateFieldProps = Omit<WithoutChildrenOrChild<DateFieldRootProps>, 'readonly'> &
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'placeholder'> & {
    /** Uncontrolled initial value. */
    defaultValue?: DateValue
    /**
     * Field appearance - bordered or filled.
     * @default 'outline'
     */
    variant?: DateFieldVariant
    /**
     * Height, padding, and text scale.
     * @default 'md'
     */
    size?: DateFieldSize
    /** Adornment rendered before the segments, inside the frame. */
    start?: Snippet
    /** Adornment rendered after the segments, inside the frame. */
    end?: Snippet
    /**
     * Segments stay focusable and readable but can't be edited.
     * @default false
     */
    readOnly?: boolean
    /** Renders a hidden `<input>` with the ISO date for form submission. */
    name?: string
    /**
     * Drop the input appearance - for composing inside another field (used by `DatePicker`).
     * @default false
     */
    unstyled?: boolean
  }
</script>

<script lang="ts">
  import { DateField as BitsDateField } from 'bits-ui'
  import { asBitsAttrs, cn } from '../../internal/utils'
  import { getFieldContext, mergeFieldControl } from '../field/field-context'
  import { inputVariants } from '../input/input-variants'

  let {
    class: className,
    value = $bindable(),
    defaultValue,
    onValueChange,
    placeholder = $bindable(),
    onPlaceholderChange,
    variant = 'outline',
    size = 'md',
    start,
    end,
    disabled,
    readOnly = false,
    required,
    name,
    unstyled = false,
    granularity,
    locale,
    minValue,
    maxValue,
    hourCycle,
    hideTimeZone,
    readonlySegments,
    validate,
    onInvalid,
    id,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...rest
  }: DateFieldProps = $props()

  const field = getFieldContext()
  const control = $derived(
    mergeFieldControl({
      field,
      id,
      name,
      disabled,
      ariaInvalid,
      ariaDescribedby,
      omitId: true,
    }),
  )

  function handleValueChange(next: DateValue | undefined) {
    field?.clearFormError()
    value = next
    onValueChange?.(next)
  }

  function handlePlaceholderChange(next: DateValue | undefined) {
    placeholder = next
    onPlaceholderChange?.(next)
  }

  const labelledBy = $derived([ariaLabelledby, field?.labelId].filter(Boolean).join(' ') || undefined)

  const rootClasses = $derived(
    cn(
      unstyled
        ? 'inline-flex min-w-0 items-center select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed'
        : cn(
            inputVariants({ variant, size, state: 'within' }),
            'select-none',
            'data-disabled:border-border-strong! data-disabled:bg-background-subtle! data-disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:border-dashed',
          ),
      className,
    ),
  )

  const segmentClasses = cn(
    'rounded-3xs inline-block px-0.5 caret-transparent transition-colors duration-200 outline-none motion-reduce:transition-none',
    'focus:bg-(--selection-color)',
    'data-placeholder:text-foreground-subtle',
  )
</script>

<BitsDateField.Root
  bind:value={() => value ?? defaultValue, handleValueChange}
  bind:placeholder={() => placeholder, handlePlaceholderChange}
  disabled={control.disabled}
  readonly={readOnly}
  {required}
  {granularity}
  {locale}
  {minValue}
  {maxValue}
  {hourCycle}
  {hideTimeZone}
  {readonlySegments}
  {validate}
  {onInvalid}
  errorMessageId={control.invalid ? field?.errorId : undefined}
>
  <div
    data-slot="date-field"
    data-invalid={control.invalid ? '' : undefined}
    data-disabled={control.disabled ? '' : undefined}
    aria-invalid={control.ariaInvalid}
    aria-disabled={control.disabled || undefined}
    aria-label={ariaLabel}
    aria-labelledby={labelledBy}
    class={rootClasses}
    {...asBitsAttrs(rest)}
  >
    {#if start}
      <div data-slot="date-field-start" class="-ms-1 shrink-0">
        {@render start()}
      </div>
    {/if}
    <BitsDateField.Input
      name={unstyled ? undefined : control.name}
      data-slot="date-field-segments"
      dir="ltr"
      class="text-foreground flex min-w-0 flex-1 items-center"
      aria-describedby={control.describedby}
    >
      {#snippet children({ segments })}
        {#each segments as segment, i (`${i}-${segment.part}`)}
          <BitsDateField.Segment
            part={segment.part}
            data-slot="date-field-segment"
            class={segment.part === 'literal' ? 'text-foreground-subtle whitespace-pre' : segmentClasses}
          >
            {segment.value}
          </BitsDateField.Segment>
        {/each}
      {/snippet}
    </BitsDateField.Input>
    {#if end}
      <div data-slot="date-field-end" class="-me-1 shrink-0">
        {@render end()}
      </div>
    {/if}
  </div>
</BitsDateField.Root>
