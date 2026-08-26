<script lang="ts">
  import { Button, useToastManager, type ToastPosition } from '@appica/ui-svelte'

  type Props = {
    position?: ToastPosition
  }

  let { position = $bindable('bottom-right') }: Props = $props()

  const manager = useToastManager()

  const positions: { id: ToastPosition; label: string }[] = [
    { id: 'top-left', label: 'Top left' },
    { id: 'top-center', label: 'Top center' },
    { id: 'top-right', label: 'Top right' },
    { id: 'bottom-left', label: 'Bottom left' },
    { id: 'bottom-center', label: 'Bottom center' },
    { id: 'bottom-right', label: 'Bottom right' },
  ]

  function wait(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  function showDefault() {
    manager.add({
      title: 'Event created',
      description: 'Monday, January 3rd at 6:00pm',
    })
  }

  function showIcon(kind: 'success' | 'error' | 'info') {
    switch (kind) {
      case 'success':
        manager.add({
          title: 'File uploaded',
          description: 'photo.jpg is ready to share.',
          data: { icon: kind },
        })
        return
      case 'error':
        manager.add({
          title: 'Payment failed',
          description: 'The card was declined.',
          data: { icon: kind },
        })
        return
      case 'info':
        manager.add({
          title: 'New version available',
          description: 'Reload to pick up the latest changes.',
          data: { icon: kind },
        })
        return
      default: {
        const _never: never = kind
        return _never
      }
    }
  }

  function showThumbnail() {
    manager.add({
      title: 'Alicia posted a photo',
      description: 'Sunset over the ridge.',
      data: {
        thumbnail: 'https://picsum.photos/80',
        thumbnailAlt: 'Sunset over the ridge',
      },
    })
  }

  function showAction() {
    const id = manager.add({
      title: 'File deleted',
      description: 'report.csv was moved to trash.',
      timeout: 0,
      actionProps: {
        children: 'Undo',
        onclick: () => {
          manager.close(id)
          manager.add({
            title: 'File restored',
            description: 'report.csv is back in place.',
            data: { icon: 'success' },
          })
        },
      },
    })
  }

  function showPromise(shouldFail: boolean) {
    void manager
      .promise(wait(1600).then(() => {
        if (shouldFail) throw new Error('offline')
      }), {
        loading: {
          title: 'Saving changes',
          description: 'Keep this tab open.',
          data: { icon: 'loading' },
        },
        success: {
          title: 'Changes saved',
          description: 'Your profile is up to date.',
          data: { icon: 'success' },
        },
        error: {
          title: 'Could not save',
          description: 'Check your connection and try again.',
          data: { icon: 'error' },
        },
      })
      .catch(() => {})
  }

  function showFrom(next: ToastPosition) {
    position = next
    manager.add({
      title: 'Stacked here',
      description: `Anchored to ${next.replaceAll('-', ' ')}.`,
    })
  }

  function showTimeout(ms: number) {
    manager.add({
      title: `Closes in ${ms / 1000}s`,
      description: 'Watch the progress bar.',
      timeout: ms,
      progress: true,
    })
  }
</script>

<div class="flex flex-col gap-8">
  <div class="flex flex-col gap-2">
    <h3 class="text-foreground-emphasis text-sm font-medium">Default</h3>
    <div class="flex flex-wrap gap-2">
      <Button onclick={showDefault}>Show toast</Button>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h3 class="text-foreground-emphasis text-sm font-medium">With an icon</h3>
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" onclick={() => showIcon('success')}>Success</Button>
      <Button variant="outline" onclick={() => showIcon('error')}>Error</Button>
      <Button variant="outline" onclick={() => showIcon('info')}>Info</Button>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h3 class="text-foreground-emphasis text-sm font-medium">With a thumbnail</h3>
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" onclick={showThumbnail}>Show toast</Button>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h3 class="text-foreground-emphasis text-sm font-medium">With an action</h3>
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" onclick={showAction}>Delete file</Button>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h3 class="text-foreground-emphasis text-sm font-medium">Promise</h3>
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" onclick={() => showPromise(false)}>Save</Button>
      <Button variant="outline" onclick={() => showPromise(true)}>Save (fail)</Button>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h3 class="text-foreground-emphasis text-sm font-medium">Positions</h3>
    <div class="flex flex-wrap gap-2">
      {#each positions as item (item.id)}
        <Button variant={position === item.id ? 'primary' : 'outline'} onclick={() => showFrom(item.id)}>
          {item.label}
        </Button>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h3 class="text-foreground-emphasis text-sm font-medium">Timeout & progress</h3>
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" onclick={() => showTimeout(3000)}>3 seconds</Button>
      <Button variant="outline" onclick={() => showTimeout(8000)}>8 seconds</Button>
    </div>
  </div>
</div>
