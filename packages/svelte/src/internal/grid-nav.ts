export type GridNavOptions = {
  getOpen: () => boolean
  getEnabled: () => boolean
  getCols: () => number
  getDir: () => 'ltr' | 'rtl'
  itemSelector: string
}

function visibleItems(selector: string): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>(selector)].filter((el) => {
    if (el.hasAttribute('data-disabled')) return false
    return el.getClientRects().length > 0
  })
}

function highlight(item: HTMLElement) {
  item.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }))
}

export function handleGridNavKeydown(event: KeyboardEvent, opts: GridNavOptions): boolean {
  if (!opts.getEnabled() || !opts.getOpen()) return false
  const key = event.key
  if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'ArrowUp' && key !== 'ArrowDown') {
    return false
  }

  const cols = Math.max(1, opts.getCols())
  const items = visibleItems(opts.itemSelector)
  if (items.length === 0) return false

  const current = items.findIndex((el) => el.hasAttribute('data-highlighted'))
  const input = event.target instanceof HTMLInputElement ? event.target : null
  const atStart = input != null && input.selectionStart === 0 && input.selectionEnd === 0
  const atEnd = input != null && input.selectionStart === input.value.length && input.selectionEnd === input.value.length
  const rtl = opts.getDir() === 'rtl'
  const horizontal = key === 'ArrowLeft' || key === 'ArrowRight'
  const towardEnd = key === 'ArrowRight' ? !rtl : rtl

  if (horizontal && current < 0 && !(towardEnd ? atEnd : atStart)) {
    return false
  }

  let next = current < 0 ? 0 : current
  if (key === 'ArrowDown') next = Math.min(items.length - 1, next + cols)
  else if (key === 'ArrowUp') next = Math.max(0, next - cols)
  else if (towardEnd) next = Math.min(items.length - 1, next + 1)
  else next = Math.max(0, next - 1)

  event.preventDefault()
  event.stopPropagation()
  const target = items[next]
  if (target) highlight(target)
  return true
}

export function attachGridNav(node: HTMLElement, opts: GridNavOptions) {
  const onKeyDown = (event: KeyboardEvent) => {
    handleGridNavKeydown(event, opts)
  }
  node.addEventListener('keydown', onKeyDown, true)
  return () => node.removeEventListener('keydown', onKeyDown, true)
}
