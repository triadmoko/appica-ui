<script lang="ts">
  import {
    DirectionProvider,
    Sparkline,
    SparklineChart,
    SparklineLabel,
    SparklineValue,
    Switch,
    type SparklinePoint,
  } from '@appica/ui-svelte'

  const VARIANTS = ['line', 'area', 'column'] as const
  const CURVES = ['0', '0.5', '1'] as const
  const STROKES = ['1', '2', '3'] as const
  const COLORS = [
    { label: 'var(--primary) (default)', value: '' },
    { label: 'var(--success-emphasis)', value: 'var(--success-emphasis)' },
    { label: 'var(--error-emphasis)', value: 'var(--error-emphasis)' },
    { label: 'var(--warning-emphasis)', value: 'var(--warning-emphasis)' },
    { label: '#a855f7', value: '#a855f7' },
    { label: 'var(--info-emphasis)', value: 'var(--info-emphasis)' },
  ] as const

  const USAGE_DATA = [8, 14, 10, 18, 15, 22, 19, 27]
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']
  const FILLED_DATA = [12, 19, 15, 24, 20, 28, 25, 33]
  const CURVE_DATA = [10, 24, 12, 28, 16, 30, 14, 26]
  const DATA = [820, 932, 901, 934, 1290, 1330, 1320]
  const LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  let playgroundVariant: (typeof VARIANTS)[number] = $state('line')
  let playgroundFill = $state<'false' | 'true'>('false')
  let playgroundCurve = $state<(typeof CURVES)[number]>('0.5')
  let playgroundStroke = $state<(typeof STROKES)[number]>('2')
  let playgroundTooltip = $state<'false' | 'true'>('false')
  let playgroundColor = $state('')

  const playgroundFillValue = $derived(playgroundFill === 'true')
  const playgroundTooltipValue = $derived(playgroundTooltip === 'true')
  const playgroundCurveValue = $derived(Number(playgroundCurve))
  const playgroundStrokeValue = $derived(Number(playgroundStroke))

  let active = $state<SparklinePoint | null>(null)
  const point = $derived(
    active ?? { index: DATA.length - 1, value: DATA[DATA.length - 1]!, label: LABELS[DATA.length - 1] },
  )
  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Sparkline</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Playground</p>
    <div class="flex flex-wrap items-center gap-3 text-sm">
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">Variant</span>
        <select bind:value={playgroundVariant} class="border-border bg-background rounded-md border px-2 py-1">
          {#each VARIANTS as variant (variant)}
            <option value={variant}>{variant}</option>
          {/each}
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">fill</span>
        <select bind:value={playgroundFill} class="border-border bg-background rounded-md border px-2 py-1">
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">curve</span>
        <select bind:value={playgroundCurve} class="border-border bg-background rounded-md border px-2 py-1">
          {#each CURVES as curve (curve)}
            <option value={curve}>{curve}</option>
          {/each}
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">strokeWidth</span>
        <select bind:value={playgroundStroke} class="border-border bg-background rounded-md border px-2 py-1">
          {#each STROKES as stroke (stroke)}
            <option value={stroke}>{stroke}</option>
          {/each}
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">tooltip</span>
        <select bind:value={playgroundTooltip} class="border-border bg-background rounded-md border px-2 py-1">
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
      </label>
      <label class="flex items-center gap-2">
        <span class="text-foreground-muted">color</span>
        <select bind:value={playgroundColor} class="border-border bg-background rounded-md border px-2 py-1">
          {#each COLORS as color (color.value)}
            <option value={color.value}>{color.label}</option>
          {/each}
        </select>
      </label>
    </div>
    <Sparkline data={USAGE_DATA} color={playgroundColor || undefined} class="w-64 max-w-full">
      <SparklineChart
        variant={playgroundVariant}
        fill={playgroundFillValue}
        curve={playgroundCurveValue}
        strokeWidth={playgroundStrokeValue}
        tooltip={playgroundTooltipValue}
        height={56}
        aria-label="Live playground"
      />
    </Sparkline>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Usage</p>
    <Sparkline data={USAGE_DATA} class="w-64 max-w-full">
      <SparklineChart variant="area" />
    </Sparkline>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Line</p>
    <Sparkline data={[8, 14, 10, 18, 15, 22, 19, 27, 24, 31]} class="w-64 max-w-full">
      <SparklineChart aria-label="Trend over the last 10 periods" />
    </Sparkline>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Area</p>
    <div class="flex w-64 max-w-full flex-col gap-6">
      <Sparkline data={[6, 11, 8, 16, 13, 22, 18, 27]}>
        <SparklineChart variant="area" height={56} aria-label="Signups over 8 weeks" />
      </Sparkline>
      <Sparkline data={[3, -4, 2, 6, -2, -6, 4, 1]}>
        <SparklineChart variant="area" height={56} aria-label="Net change over 8 weeks" />
      </Sparkline>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Filled line</p>
    <div class="flex w-64 max-w-full flex-col gap-6">
      <Sparkline data={FILLED_DATA}>
        <SparklineChart height={56} aria-label="Line" />
      </Sparkline>
      <Sparkline data={FILLED_DATA}>
        <SparklineChart fill height={56} aria-label="Gradient-filled line" />
      </Sparkline>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Columns</p>
    <div class="flex w-64 max-w-full flex-col gap-6">
      <Sparkline data={[4, 9, 6, 12, 8, 15, 11, 18]} labels={DAYS}>
        <SparklineChart variant="column" height={56} tooltip aria-label="Daily visits" />
      </Sparkline>
      <Sparkline data={[6, -7, 9, -4, 8, -9, 5, -6]} labels={DAYS}>
        <SparklineChart variant="column" height={56} tooltip aria-label="Net change per day" />
      </Sparkline>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Line smoothing</p>
    <div class="flex w-64 max-w-full flex-col gap-6">
      <Sparkline data={CURVE_DATA}>
        <SparklineChart curve={0} aria-label="Straight segments" />
      </Sparkline>
      <Sparkline data={CURVE_DATA}>
        <SparklineChart curve={1} aria-label="Fully smoothed" />
      </Sparkline>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Line weight</p>
    <div class="flex w-64 max-w-full flex-col gap-6">
      <Sparkline data={CURVE_DATA}>
        <SparklineChart strokeWidth={1} aria-label="Thin line" />
      </Sparkline>
      <Sparkline data={CURVE_DATA}>
        <SparklineChart strokeWidth={3} aria-label="Thick line" />
      </Sparkline>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Tooltip</p>
    <Sparkline
      data={[8, 15, 11, 20, 16, 26, 22]}
      labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      class="w-72 max-w-full"
    >
      <SparklineChart variant="area" height={56} tooltip aria-label="Weekly requests" />
    </Sparkline>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Value headline</p>
    <Sparkline
      data={[198_120, 201_540, 199_880, 205_300, 208_770, 214_260, 222_240]}
      labels={['Nov 11', 'Nov 12', 'Nov 13', 'Nov 14', 'Nov 15', 'Nov 16', 'Nov 17']}
      class="w-72 max-w-full"
    >
      <SparklineLabel />
      <SparklineValue class="text-2xl" />
      <SparklineChart fill height={56} tooltip aria-label="Active users this week" />
    </Sparkline>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Reacting to the active point</p>
    <div class="w-72 max-w-full">
      <div class="mb-1 flex items-baseline justify-between">
        <span class="text-foreground-muted text-sm">{point.label}</span>
        <span class="text-foreground-intense text-lg font-semibold tabular-nums">{point.value.toLocaleString()}</span>
      </div>
      <Sparkline data={DATA} labels={LABELS} onActiveChange={(next) => (active = next)}>
        <SparklineChart height={48} aria-label="Weekly requests" />
      </Sparkline>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Custom colors</p>
    <div class="flex w-64 max-w-full flex-col gap-5">
      <Sparkline data={[6, 12, 9, 16, 14, 22, 20, 28]} color="var(--success-emphasis)">
        <SparklineChart variant="area" aria-label="Revenue" />
      </Sparkline>
      <Sparkline data={[28, 22, 25, 16, 19, 12, 14, 8]} color="var(--error-emphasis)">
        <SparklineChart variant="area" aria-label="Churn" />
      </Sparkline>
      <Sparkline data={[10, 14, 11, 15, 13, 18, 15, 19]} color="var(--warning-emphasis)">
        <SparklineChart aria-label="Latency" />
      </Sparkline>
      <Sparkline data={[8, 16, 12, 22, 18, 26, 24, 32]} color="#a855f7">
        <SparklineChart fill aria-label="Engagement" />
      </Sparkline>
      <Sparkline data={[5, 11, 8, 14, 10, 18, 13, 21]} color="var(--info-emphasis)">
        <SparklineChart variant="column" aria-label="Orders" />
      </Sparkline>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="flex w-64 max-w-full flex-col gap-6">
        <Sparkline data={[4, 9, 6, 12, 8, 15, 11, 18]} labels={DAYS}>
          <SparklineChart variant="column" height={56} tooltip aria-label="Daily visits" />
        </Sparkline>
      </div>
    </DirectionProvider>
  </div>
</section>
