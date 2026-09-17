<script lang="ts">
  import {
    Button,
    DirectionProvider,
    ScrollArea,
    Slider,
    Switch,
    TextAnimate,
    type TextAnimateEffect,
  } from '@appica/ui-svelte'

  const blurRise: TextAnimateEffect = (p) => ({
    style: {
      display: 'inline-block',
      opacity: p,
      filter: `blur(${((1 - p) * 6).toFixed(2)}px)`,
      transform: `translateY(${((1 - p) * 0.5).toFixed(3)}em)`,
    },
  })

  let typewriterRun = $state(0)
  let scrambleRun = $state(0)
  let riseRun = $state(0)
  let customRun = $state(0)
  let scrollPlay = $state(0)
  let flipProgress = $state(0.5)
  let dir: 'ltr' | 'rtl' = $state('ltr')

  function attachScrollReveal(root: HTMLElement) {
    const viewport = root.querySelector('[data-slot="scroll-area-viewport"]')
    const target = root.querySelector('[data-slot="text-animate-highlight-target"]')
    if (!(viewport instanceof HTMLElement) || !(target instanceof HTMLElement)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        scrollPlay = entry?.isIntersecting ? scrollPlay + 1 : 0
      },
      { root: viewport, threshold: 0.8 },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">TextAnimate</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Typewriter</p>
    <div class="flex flex-col items-center gap-6">
      {#key typewriterRun}
        <TextAnimate
          text="Ship beautiful interfaces, fast."
          effect="typewriter"
          duration={2}
          class="text-foreground-intense text-3xl font-semibold"
        />
      {/key}
      <Button variant="outline" size="sm" onclick={() => (typewriterRun += 1)}>Replay</Button>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Scramble</p>
    <div class="flex flex-col items-center gap-6">
      {#key scrambleRun}
        <TextAnimate
          text="Decoding the signal"
          effect="scramble"
          duration={1.6}
          class="text-foreground-intense font-mono text-3xl font-semibold"
        />
      {/key}
      <Button variant="outline" size="sm" onclick={() => (scrambleRun += 1)}>Replay</Button>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Rise</p>
    <div class="flex flex-col items-center gap-6">
      {#key riseRun}
        <TextAnimate
          text="Rising into view"
          effect="rise"
          duration={1.6}
          class="text-foreground-intense text-3xl font-semibold"
        />
      {/key}
      <Button variant="outline" size="sm" onclick={() => (riseRun += 1)}>Replay</Button>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Reveal on scroll into view</p>
    <div {@attach attachScrollReveal}>
      <ScrollArea class="border-border h-72 w-full max-w-md rounded-lg border">
        <div class="p-6">
          <div class="h-72"></div>
          <div data-slot="text-animate-highlight-target">
            {#key scrollPlay}
              <TextAnimate
                text="Scroll this paragraph into view and it reveals itself, word by word."
                effect="highlight"
                duration={1.4}
                class="text-foreground-intense text-xl leading-relaxed font-medium"
                autoPlay={scrollPlay > 0}
                progress={scrollPlay > 0 ? undefined : 0}
              />
            {/key}
          </div>
          <div class="h-44"></div>
        </div>
      </ScrollArea>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Drive it yourself</p>
    <div class="flex w-full max-w-sm flex-col items-center gap-8">
      <TextAnimate
        text="Scrub me"
        effect="flip"
        autoPlay={false}
        progress={flipProgress}
        class="text-foreground-intense text-4xl font-semibold"
      />
      <Slider
        class="w-full"
        bind:value={flipProgress}
        min={0}
        max={1}
        step={0.01}
        tooltipVisibility="never"
        thumbAriaLabel="Animation progress"
      />
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Continuous effects</p>
    <div class="text-foreground-intense flex flex-col items-center gap-6 text-3xl font-semibold">
      <TextAnimate text="Riding the wave" effect="wave" />
      <TextAnimate text="Shimmering headline" effect="shimmer" />
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Custom effects</p>
    <div class="flex flex-col items-center gap-6">
      {#key customRun}
        <TextAnimate
          text="Roll your own effect"
          effect={blurRise}
          by="char"
          stagger={0.5}
          duration={1.6}
          class="text-foreground-intense text-3xl font-semibold"
        />
      {/key}
      <Button variant="outline" size="sm" onclick={() => (customRun += 1)}>Replay</Button>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Multiple lines</p>
    <TextAnimate
      text={'Line breaks are preserved.\nWords wrap and stagger\nacross every line you give it.'}
      effect="highlight"
      by="word"
      loop
      duration={4}
      class="text-foreground-intense max-w-md text-center text-xl leading-relaxed font-medium"
    />
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="flex flex-col items-center gap-3">
        <TextAnimate
          text="صمم واجهات جميلة، بسرعة."
          effect="highlight"
          by="word"
          duration={1.6}
          class="text-foreground-intense text-3xl font-semibold"
        />
        <p class="text-foreground-muted max-w-md text-center text-sm">
          Use word or line splitting for cursive scripts. Splitting by character wraps every glyph and breaks Arabic joining.
        </p>
      </div>
    </DirectionProvider>
  </div>
</section>
