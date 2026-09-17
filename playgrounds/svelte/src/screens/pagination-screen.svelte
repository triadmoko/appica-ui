<script lang="ts">
  import {
    DirectionProvider,
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationList,
    Switch,
  } from '@appica/ui-svelte'

  const VARIANTS = ['outline', 'soft'] as const
  const SIZES = ['sm', 'md', 'lg'] as const
  const TOTAL = 5

  let page = $state(1)
  let dir: 'ltr' | 'rtl' = $state('ltr')

  function go(target: number) {
    page = Math.min(Math.max(target, 1), TOTAL)
  }

  function stay(event: MouseEvent) {
    event.preventDefault()
  }
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

{#snippet chevronsLeft()}
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
    <path d="m11 17-5-5 5-5"></path>
    <path d="m18 17-5-5 5-5"></path>
  </svg>
{/snippet}

{#snippet chevronsRight()}
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
    <path d="m6 17 5-5-5-5"></path>
    <path d="m13 17 5-5-5-5"></path>
  </svg>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Pagination</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Default</p>
    <Pagination>
      <PaginationList>
        <PaginationItem>
          <PaginationLink href="#!" aria-label="Go to previous page" class="px-0" disabled onclick={stay}>
            {@render chevronLeft()}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#!" active onclick={stay}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#!" onclick={stay}>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#!" onclick={stay}>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#!" onclick={stay}>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#!" aria-label="Go to next page" class="px-0" onclick={stay}>
            {@render chevronRight()}
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Variants</p>
    <div class="flex flex-col items-center gap-6">
      {#each VARIANTS as variant (variant)}
        <Pagination {variant}>
          <PaginationList>
            <PaginationItem>
              <PaginationLink href="#!" active onclick={stay}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" onclick={stay}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" onclick={stay}>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" onclick={stay}>4</PaginationLink>
            </PaginationItem>
          </PaginationList>
        </Pagination>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex flex-col items-center gap-6">
      {#each SIZES as size (size)}
        <Pagination {size}>
          <PaginationList>
            <PaginationItem>
              <PaginationLink href="#!" active onclick={stay}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" onclick={stay}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" onclick={stay}>3</PaginationLink>
            </PaginationItem>
          </PaginationList>
        </Pagination>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">With first and last</p>
    <div class="max-w-full scrollbar-none overflow-auto">
      <Pagination>
        <PaginationList>
          <PaginationItem>
            <PaginationLink href="#!" aria-label="Go to first page" class="px-0" onclick={stay}>
              {@render chevronsLeft()}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#!" aria-label="Go to previous page" class="px-0" onclick={stay}>
              {@render chevronLeft()}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#!" onclick={stay}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#!" onclick={stay}>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#!" active onclick={stay}>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#!" onclick={stay}>4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#!" onclick={stay}>5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#!" aria-label="Go to next page" class="px-0" onclick={stay}>
              {@render chevronRight()}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#!" aria-label="Go to last page" class="px-0" onclick={stay}>
              {@render chevronsRight()}
            </PaginationLink>
          </PaginationItem>
        </PaginationList>
      </Pagination>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Controlled</p>
    <div class="flex flex-col items-center gap-3">
      <p class="text-foreground-muted text-sm">Page {page} of {TOTAL}</p>
      <Pagination>
        <PaginationList>
          <PaginationItem>
            <PaginationLink
              el="button"
              aria-label="Go to previous page"
              class="px-0"
              disabled={page === 1}
              onclick={() => go(page - 1)}
            >
              {@render chevronLeft()}
            </PaginationLink>
          </PaginationItem>
          {#each Array.from({ length: TOTAL }, (_, index) => index + 1) as n (n)}
            <PaginationItem>
              <PaginationLink el="button" active={n === page} aria-label={`Go to page ${n}`} onclick={() => go(n)}>
                {n}
              </PaginationLink>
            </PaginationItem>
          {/each}
          <PaginationItem>
            <PaginationLink
              el="button"
              aria-label="Go to next page"
              class="px-0"
              disabled={page === TOTAL}
              onclick={() => go(page + 1)}
            >
              {@render chevronRight()}
            </PaginationLink>
          </PaginationItem>
        </PaginationList>
      </Pagination>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Links</p>
    <Pagination>
      <PaginationList>
        <PaginationItem>
          <PaginationLink href="?page=1" aria-label="Go to previous page" class="px-0" onclick={stay}>
            {@render chevronLeft()}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=1" onclick={stay}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink active>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=3" onclick={stay}>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=3" aria-label="Go to next page" class="px-0" onclick={stay}>
            {@render chevronRight()}
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        <Pagination>
          <PaginationList>
            <PaginationItem>
              <PaginationLink href="#!" aria-label="Go to previous page" class="px-0" disabled onclick={stay}>
                {@render chevronLeft()}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" active onclick={stay}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" onclick={stay}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" onclick={stay}>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" onclick={stay}>10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#!" aria-label="Go to next page" class="px-0" onclick={stay}>
                {@render chevronRight()}
              </PaginationLink>
            </PaginationItem>
          </PaginationList>
        </Pagination>
      </div>
    </DirectionProvider>
  </div>
</section>
