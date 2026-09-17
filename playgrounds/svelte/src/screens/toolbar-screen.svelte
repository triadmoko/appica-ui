<script lang="ts">
  import {
    DirectionProvider,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
    Toggle,
    ToggleGroup,
    Toolbar,
    ToolbarButton,
    ToolbarGroup,
    ToolbarInput,
    ToolbarLink,
    ToolbarSeparator,
    buttonVariants,
    inputVariants,
  } from '@appica/ui-svelte'

  let dir: 'ltr' | 'rtl' = $state('ltr')
  const iconClass = buttonVariants({ variant: 'ghost', size: 'icon-md' })
  const fonts = ['Geist', 'Inter', 'Figtree', 'Urbanist']
</script>

{#snippet searchIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="start">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
{/snippet}
{#snippet filterIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="start">
    <path d="M3 6h18" />
    <path d="M7 12h10" />
    <path d="M10 18h4" />
  </svg>
{/snippet}
{#snippet downloadIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="start">
    <path d="M12 15V3" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
{/snippet}
{#snippet undoIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 7v6h6" />
    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6.7 3L3 13" />
  </svg>
{/snippet}
{#snippet redoIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 7v6h-6" />
    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6.7 3L21 13" />
  </svg>
{/snippet}
{#snippet typeIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="start">
    <path d="M4 7V4h16v3" />
    <path d="M9 20h6" />
    <path d="M12 4v16" />
  </svg>
{/snippet}
{#snippet alignLeft()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M15 12H3" />
    <path d="M17 18H3" />
    <path d="M21 6H3" />
  </svg>
{/snippet}
{#snippet alignCenter()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M17 12H7" />
    <path d="M19 18H5" />
    <path d="M21 6H3" />
  </svg>
{/snippet}
{#snippet alignRight()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12H9" />
    <path d="M21 18H7" />
    <path d="M21 6H3" />
  </svg>
{/snippet}
{#snippet boldIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 12h9a4 4 0 0 1 0 8H6V4h8a4 4 0 0 1 0 8" />
  </svg>
{/snippet}
{#snippet italicIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M19 4h-9" />
    <path d="M14 20H5" />
    <path d="m15 4-6 16" />
  </svg>
{/snippet}
{#snippet underlineIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 4v6a6 6 0 0 0 12 0V4" />
    <path d="M4 20h16" />
  </svg>
{/snippet}
{#snippet copyIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect width="14" height="14" x="8" y="8" rx="2" />
    <path d="M4 16V4a2 2 0 0 1 2-2h10" />
  </svg>
{/snippet}
{#snippet scissorsIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M20 4 8.12 15.88" />
    <path d="M14.47 14.48 20 20" />
    <path d="M8.12 8.12 12 12" />
  </svg>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Toolbar</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Default</p>
    <Toolbar aria-label="Table actions">
      <ToolbarInput
        class={inputVariants({ variant: 'outline', size: 'md', state: 'self' }) + ' w-44'}
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />
      <ToolbarGroup aria-label="Refine">
        <ToolbarButton class={buttonVariants({ variant: 'ghost' })}>
          {@render filterIcon()}
          Filter
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#export" class={buttonVariants({ variant: 'ghost' })}>
        {@render downloadIcon()}
        Export
      </ToolbarLink>
    </Toolbar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">With a toggle group</p>
    <Toolbar aria-label="Text formatting">
      <ToolbarGroup aria-label="History">
        <ToolbarButton class={iconClass} aria-label="Undo">{@render undoIcon()}</ToolbarButton>
        <ToolbarButton class={iconClass} aria-label="Redo">{@render redoIcon()}</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <Select defaultValue="Inter" alignItemWithTrigger={false}>
        <SelectTrigger class="w-36" aria-label="Font">
          {#snippet start()}
            {@render typeIcon()}
          {/snippet}
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {#each fonts as font (font)}
            <SelectItem value={font} label={font}>{font}</SelectItem>
          {/each}
        </SelectContent>
      </Select>
      <ToolbarSeparator />
      <ToggleGroup defaultValue="left" aria-label="Alignment">
        <Toggle value="left" aria-label="Align left" class={iconClass}>{@render alignLeft()}</Toggle>
        <Toggle value="center" aria-label="Align center" class={iconClass}>{@render alignCenter()}</Toggle>
        <Toggle value="right" aria-label="Align right" class={iconClass}>{@render alignRight()}</Toggle>
      </ToggleGroup>
    </Toolbar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Vertical orientation</p>
    <Toolbar aria-label="Formatting" orientation="vertical">
      <ToolbarGroup aria-label="Text style">
        <ToolbarButton class={iconClass} aria-label="Bold">{@render boldIcon()}</ToolbarButton>
        <ToolbarButton class={iconClass} aria-label="Italic">{@render italicIcon()}</ToolbarButton>
        <ToolbarButton class={iconClass} aria-label="Underline">{@render underlineIcon()}</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Clipboard">
        <ToolbarButton class={iconClass} aria-label="Copy">{@render copyIcon()}</ToolbarButton>
        <ToolbarButton class={iconClass} aria-label="Cut">{@render scissorsIcon()}</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <Toolbar aria-label="RTL toolbar">
          <ToolbarButton class={buttonVariants({ variant: 'ghost' })}>Filter</ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton class={buttonVariants({ variant: 'ghost' })}>Export</ToolbarButton>
        </Toolbar>
      </div>
    </DirectionProvider>
  </div>
</section>
