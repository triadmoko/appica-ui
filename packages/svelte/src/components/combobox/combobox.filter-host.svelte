<script lang="ts">
  import Combobox from './combobox.svelte'
  import ComboboxContent from './combobox-content.svelte'
  import ComboboxEmpty from './combobox-empty.svelte'
  import ComboboxInput from './combobox-input.svelte'
  import ComboboxItem from './combobox-item.svelte'
  import ComboboxList from './combobox-list.svelte'

  const FRAMEWORKS = ['Next.js', 'SvelteKit', 'Astro']
</script>

<Combobox items={FRAMEWORKS}>
  <ComboboxInput placeholder="Search" aria-label="Search" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {#snippet children(item)}
        <ComboboxItem value={String(item)} label={String(item)}>{item}</ComboboxItem>
      {/snippet}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
