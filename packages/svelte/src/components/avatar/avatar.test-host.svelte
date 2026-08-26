<script lang="ts">
  import Avatar from './avatar.svelte'
  import AvatarBadge from './avatar-badge.svelte'
  import AvatarFallback from './avatar-fallback.svelte'
  import AvatarImage from './avatar-image.svelte'
  import type { AvatarPresetSize, AvatarShape } from './avatar-variants'

  let {
    size,
    shape,
    class: className,
    style,
    fallback = 'JD',
    src,
    alt = '',
    showBadge = false,
    animateBadge = false,
    badgeClass,
    testId,
  }: {
    size?: AvatarPresetSize | number
    shape?: AvatarShape
    class?: string
    style?: string
    fallback?: string
    src?: string
    alt?: string
    showBadge?: boolean
    animateBadge?: boolean
    badgeClass?: string
    testId?: string
  } = $props()
</script>

<Avatar {size} {shape} class={className} {style} data-testid={testId}>
  {#if src}
    <AvatarImage {src} {alt} />
  {/if}
  <AvatarFallback>{fallback}</AvatarFallback>
  {#if showBadge}
    <AvatarBadge animate={animateBadge} class={badgeClass} />
  {/if}
</Avatar>
