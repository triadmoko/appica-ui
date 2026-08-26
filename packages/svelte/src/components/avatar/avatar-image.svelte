<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements'
  import { cn } from '../../internal/utils'
  import { getAvatarContext } from './avatar-context'

  type Props = HTMLImgAttributes & {
    src?: string
    alt?: string
  }

  let { class: className, src, alt = '', ...rest }: Props = $props()

  const avatar = getAvatarContext()

  function handleLoad() {
    avatar?.setStatus('loaded')
  }

  function handleError() {
    avatar?.setStatus('error')
  }
</script>

{#if src && avatar?.status !== 'error'}
  <img
    data-slot="avatar-image"
    {src}
    {alt}
    class={cn('size-full rounded-[inherit] object-cover', className)}
    onload={handleLoad}
    onerror={handleError}
    {...rest}
  />
{/if}
