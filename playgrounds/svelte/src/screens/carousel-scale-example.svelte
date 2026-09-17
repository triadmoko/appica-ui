<script lang="ts">
  import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrev,
    CarouselSlide,
    buttonVariants,
    type CarouselApi,
  } from '@appica/ui-svelte'

  const SLIDES = [1, 2, 3, 4, 5, 6]
  const TWEEN_FACTOR = 1.1
  const SLIDE_SRC = (n: number) => `https://appica.dev/carousel/slide-${n}.jpg`
  const navSquare = buttonVariants({ variant: 'outline', size: 'icon-md' })
  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

  let api = $state.raw<CarouselApi | undefined>(undefined)

  $effect(() => {
    const carouselApi = api
    if (!carouselApi) return
    const nodes = carouselApi.slideNodes().map((slide) => slide.querySelector<HTMLElement>('[data-scale-layer]'))

    const tween = (_api: CarouselApi, event?: { type: string }) => {
      const engine = carouselApi.internalEngine()
      const scrollProgress = carouselApi.scrollProgress()
      const slidesInView = carouselApi.slidesInView()
      const isScroll = event?.type === 'scroll'

      carouselApi.snapList().forEach((snap, snapIndex) => {
        let diffToTarget = snap - scrollProgress
        const slidesInSnap = engine.scrollSnapList.slidesBySnap[snapIndex] ?? []

        slidesInSnap.forEach((slideIndex) => {
          if (isScroll && !slidesInView.includes(slideIndex)) return
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem: { target: () => number; index: number }) => {
              const target = loopItem.target()
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)
                if (sign === -1) diffToTarget = snap - (1 + scrollProgress)
                if (sign === 1) diffToTarget = snap + (1 - scrollProgress)
              }
            })
          }
          const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
          const scale = clamp(tweenValue, 0.58, 1)
          const opacity = clamp(tweenValue, 0.24, 1)
          const node = nodes[slideIndex]
          if (node) {
            node.style.transform = `scale(${scale})`
            node.style.opacity = `${opacity}`
            node.style.transformOrigin = diffToTarget > 0 ? 'left center' : diffToTarget < 0 ? 'right center' : 'center'
          }
        })
      })
    }

    tween(carouselApi)
    carouselApi.on('scroll', tween)
    carouselApi.on('slidefocus', tween)
    carouselApi.on('reinit', tween)
    return () => {
      carouselApi.off('scroll', tween)
      carouselApi.off('slidefocus', tween)
      carouselApi.off('reinit', tween)
    }
  })
</script>

{#snippet chevronLeft()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="rtl:rotate-180"
  >
    <path d="m15 18-6-6 6-6"></path>
  </svg>
{/snippet}

{#snippet chevronRight()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="rtl:rotate-180"
  >
    <path d="m9 18 6-6-6-6"></path>
  </svg>
{/snippet}

<div class="w-full max-w-xl">
  <Carousel
    loop
    align="center"
    setApi={(next) => {
      api = next
    }}
  >
    <CarouselContent>
      {#each SLIDES as n (n)}
        <CarouselSlide class="basis-2/3">
          <div data-scale-layer class="transition-none">
            <img src={SLIDE_SRC(n)} alt="Slide {n}" class="aspect-3/2 w-full rounded-xl object-cover" />
          </div>
        </CarouselSlide>
      {/each}
    </CarouselContent>
    <div class="mt-5 flex justify-center gap-2">
      <CarouselPrev position="none" buttonProps={{ class: navSquare }}>{@render chevronLeft()}</CarouselPrev>
      <CarouselNext position="none" buttonProps={{ class: navSquare }}>{@render chevronRight()}</CarouselNext>
    </div>
  </Carousel>
</div>
