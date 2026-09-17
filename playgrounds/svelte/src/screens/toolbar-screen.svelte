<script lang="ts">
  import {
    DirectionProvider,
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
  } from '@appica/ui-svelte'

  let dir: 'ltr' | 'rtl' = $state('ltr')
  let query = $state('')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Toolbar</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Default</p>
    <Toolbar aria-label="Inbox">
      <ToolbarInput
        class={buttonVariants({ variant: 'soft', size: 'sm' }) + ' w-40 px-2'}
        placeholder="Filter"
        value={query}
        oninput={(event) => (query = event.currentTarget.value)}
        aria-label="Filter"
      />
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Actions">
        <ToolbarButton class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Filter</ToolbarButton>
        <ToolbarButton class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Export</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#help" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Help</ToolbarLink>
    </Toolbar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">With a toggle group</p>
    <Toolbar aria-label="Editor">
      <ToggleGroup multiple defaultValue={['bold']} aria-label="Text style">
        <Toggle value="bold" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Bold</Toggle>
        <Toggle value="italic" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Italic</Toggle>
        <Toggle value="underline" class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Underline</Toggle>
      </ToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Link</ToolbarButton>
    </Toolbar>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Vertical</p>
    <Toolbar orientation="vertical" aria-label="Zoom">
      <ToolbarButton class={buttonVariants({ variant: 'ghost', size: 'sm' })}>In</ToolbarButton>
      <ToolbarButton class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Out</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Fit</ToolbarButton>
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
          <ToolbarButton class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Filter</ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton class={buttonVariants({ variant: 'ghost', size: 'sm' })}>Export</ToolbarButton>
        </Toolbar>
      </div>
    </DirectionProvider>
  </div>
</section>
