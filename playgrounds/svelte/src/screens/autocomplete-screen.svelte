<script lang="ts">
  import {
    Autocomplete,
    AutocompleteContent,
    AutocompleteEmpty,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompleteStatus,
    DirectionProvider,
    Field,
    FieldLabel,
    Switch,
  } from '@appica/ui-svelte'

  const FRAMEWORKS = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']

  let dir: 'ltr' | 'rtl' = $state('ltr')
  let query = $state('')

  const filtered = $derived(
    FRAMEWORKS.filter((item) => item.toLowerCase().includes(query.trim().toLowerCase())),
  )
</script>

<section class="flex flex-col gap-6">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Autocomplete</h2>
  <p class="text-foreground-muted text-sm">
    Combobox analog with `icon` defaulting to false. Filtering is consumer-side.
  </p>

  <label class="flex items-center gap-2 text-sm">
    <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
    RTL
  </label>

  <DirectionProvider {dir}>
    <div class="flex max-w-sm flex-col gap-6" {dir}>
      <Autocomplete>
        <AutocompleteInput
          placeholder="Search a framework"
          aria-label="Search a framework"
          oninput={(event) => {
            query = event.currentTarget.value
          }}
        />
        <AutocompleteContent>
          <AutocompleteStatus>Type to filter. Filtering is consumer-side.</AutocompleteStatus>
          <AutocompleteList>
            {#each filtered as item (item)}
              <AutocompleteItem value={item} label={item}>{item}</AutocompleteItem>
            {:else}
              <AutocompleteEmpty>No items found.</AutocompleteEmpty>
            {/each}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>

      <Autocomplete icon clearable>
        <AutocompleteInput placeholder="With toggle" aria-label="With toggle" />
        <AutocompleteContent>
          <AutocompleteList>
            {#each FRAMEWORKS as item (item)}
              <AutocompleteItem value={item} label={item}>{item}</AutocompleteItem>
            {/each}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>

      <Field invalid>
        <FieldLabel>Invalid</FieldLabel>
        <Autocomplete>
          <AutocompleteInput placeholder="Needs a value" aria-label="Needs a value" />
          <AutocompleteContent>
            <AutocompleteList>
              <AutocompleteItem value="Next.js" label="Next.js">Next.js</AutocompleteItem>
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </Field>
    </div>
  </DirectionProvider>
</section>
