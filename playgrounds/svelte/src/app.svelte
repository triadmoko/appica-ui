<script lang="ts">
  import type { Component } from 'svelte'
  import { Button, useTheme } from '@appica/ui-svelte'
  import AlertScreen from './screens/alert-screen.svelte'
  import AvatarScreen from './screens/avatar-screen.svelte'
  import BackgroundPatternScreen from './screens/background-pattern-screen.svelte'
  import BadgeScreen from './screens/badge-screen.svelte'
  import ButtonScreen from './screens/button-screen.svelte'
  import CardScreen from './screens/card-screen.svelte'
  import ChipScreen from './screens/chip-screen.svelte'
  import CopyButtonScreen from './screens/copy-button-screen.svelte'
  import CountdownScreen from './screens/countdown-screen.svelte'
  import FieldsetScreen from './screens/fieldset-screen.svelte'
  import GradientGlowScreen from './screens/gradient-glow-screen.svelte'
  import InputScreen from './screens/input-screen.svelte'
  import KbdScreen from './screens/kbd-screen.svelte'
  import LoaderScreen from './screens/loader-screen.svelte'
  import MeterScreen from './screens/meter-screen.svelte'
  import PaginationScreen from './screens/pagination-screen.svelte'
  import ProgressScreen from './screens/progress-screen.svelte'
  import SeparatorScreen from './screens/separator-screen.svelte'
  import SkeletonScreen from './screens/skeleton-screen.svelte'
  import SpinnerScreen from './screens/spinner-screen.svelte'
  import TableScreen from './screens/table-screen.svelte'
  import TextareaScreen from './screens/textarea-screen.svelte'
  import ThumbnailScreen from './screens/thumbnail-screen.svelte'

  const screens = [
    { id: 'button', label: 'Button' },
    { id: 'badge', label: 'Badge' },
    { id: 'alert', label: 'Alert' },
    { id: 'avatar', label: 'Avatar' },
    { id: 'background-pattern', label: 'BackgroundPattern' },
    { id: 'card', label: 'Card' },
    { id: 'chip', label: 'Chip' },
    { id: 'copy-button', label: 'CopyButton' },
    { id: 'countdown', label: 'Countdown' },
    { id: 'fieldset', label: 'Fieldset' },
    { id: 'gradient-glow', label: 'GradientGlow' },
    { id: 'input', label: 'Input' },
    { id: 'textarea', label: 'Textarea' },
    { id: 'kbd', label: 'Kbd' },
    { id: 'loader', label: 'Loader' },
    { id: 'meter', label: 'Meter' },
    { id: 'pagination', label: 'Pagination' },
    { id: 'progress', label: 'Progress' },
    { id: 'separator', label: 'Separator' },
    { id: 'skeleton', label: 'Skeleton' },
    { id: 'spinner', label: 'Spinner' },
    { id: 'table', label: 'Table' },
    { id: 'thumbnail', label: 'Thumbnail' },
  ] as const

  type ScreenId = (typeof screens)[number]['id']

  const views: Record<ScreenId, Component> = {
    button: ButtonScreen,
    badge: BadgeScreen,
    alert: AlertScreen,
    avatar: AvatarScreen,
    'background-pattern': BackgroundPatternScreen,
    card: CardScreen,
    chip: ChipScreen,
    'copy-button': CopyButtonScreen,
    countdown: CountdownScreen,
    fieldset: FieldsetScreen,
    'gradient-glow': GradientGlowScreen,
    input: InputScreen,
    textarea: TextareaScreen,
    kbd: KbdScreen,
    loader: LoaderScreen,
    meter: MeterScreen,
    pagination: PaginationScreen,
    progress: ProgressScreen,
    separator: SeparatorScreen,
    skeleton: SkeletonScreen,
    spinner: SpinnerScreen,
    table: TableScreen,
    thumbnail: ThumbnailScreen,
  }

  let screen: ScreenId = $state('button')
  const theme = useTheme()
  const Screen = $derived(views[screen])

  function toggleTheme() {
    theme.setTheme(theme.resolvedTheme === 'dark' ? 'light' : 'dark')
  }
</script>

<main class="text-foreground bg-background mx-auto flex min-h-dvh max-w-4xl flex-col gap-8 px-6 py-12">
  <header class="flex items-start justify-between gap-4">
    <div>
      <h1 class="text-foreground-intense text-3xl font-semibold">Appica UI Svelte Playground</h1>
      <p class="text-foreground-muted mt-1 text-sm">
        Wave 1 components - edit <code>packages/svelte/src</code> and it hot-reloads.
      </p>
    </div>
    <Button
      variant="outline"
      size="icon-md"
      onclick={toggleTheme}
      aria-label={theme.resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      ◑
    </Button>
  </header>

  <nav class="flex flex-wrap gap-2" aria-label="Component screens">
    {#each screens as item (item.id)}
      <Button variant={screen === item.id ? 'primary' : 'soft'} size="sm" onclick={() => (screen = item.id)}>
        {item.label}
      </Button>
    {/each}
  </nav>

  <Screen />
</main>
