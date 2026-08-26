<script lang="ts">
  import Field from '../field/field.svelte'
  import FieldLabel from '../field/field-label.svelte'
  import Autocomplete from './autocomplete.svelte'
  import AutocompleteContent from './autocomplete-content.svelte'
  import AutocompleteEmpty from './autocomplete-empty.svelte'
  import AutocompleteInput from './autocomplete-input.svelte'
  import AutocompleteItem from './autocomplete-item.svelte'
  import AutocompleteList from './autocomplete-list.svelte'
  import AutocompleteStatus from './autocomplete-status.svelte'

  const FRAMEWORKS = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'] as const

  let {
    defaultValue,
    clearable,
    invalid,
    icon = true,
    placeholder = 'Search a framework',
    status,
  }: {
    defaultValue?: string
    clearable?: boolean
    invalid?: boolean
    icon?: boolean
    placeholder?: string
    status?: string
  } = $props()
</script>

{#snippet popup()}
  <AutocompleteContent>
    {#if status}
      <AutocompleteStatus>{status}</AutocompleteStatus>
    {/if}
    <AutocompleteEmpty>No items found.</AutocompleteEmpty>
    <AutocompleteList>
      {#each FRAMEWORKS as item (item)}
        <AutocompleteItem value={item} label={item}>{item}</AutocompleteItem>
      {/each}
    </AutocompleteList>
  </AutocompleteContent>
{/snippet}

{#if invalid}
  <Field {invalid}>
    <FieldLabel>Framework</FieldLabel>
    <Autocomplete {defaultValue} {clearable} {icon}>
      <AutocompleteInput {placeholder} aria-label={placeholder} />
      {@render popup()}
    </Autocomplete>
  </Field>
{:else}
  <Autocomplete {defaultValue} {clearable} {icon}>
    <AutocompleteInput {placeholder} aria-label={placeholder} />
    {@render popup()}
  </Autocomplete>
{/if}
