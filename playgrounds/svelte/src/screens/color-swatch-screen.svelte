<script lang="ts">
  import { ColorSwatch } from '@appica/ui-svelte'
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">ColorSwatch</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex items-end gap-3">
      <ColorSwatch color="#3b82f6" size="sm" />
      <ColorSwatch color="#3b82f6" size="md" />
      <ColorSwatch color="#3b82f6" size="lg" />
      <ColorSwatch color="#3b82f6" size={20} />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Shapes</p>
    <div class="flex items-center gap-3">
      <ColorSwatch color="#22c55e" />
      <ColorSwatch color="#22c55e" shape="circle" />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Translucent (checkerboard)</p>
    <div class="flex items-center gap-3">
      <ColorSwatch color="rgba(59, 130, 246, 0.5)" />
      <ColorSwatch color="rgba(59, 130, 246, 0.5)" checkerboard={false} />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled</p>
    <ColorSwatch color="#ef4444" disabled />
  </div>
</section>
