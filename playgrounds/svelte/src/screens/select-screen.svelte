<script lang="ts">
  import {
    DirectionProvider,
    Field,
    FieldError,
    FieldLabel,
    Select,
    SelectContent,
    SelectGroup,
    SelectGroupLabel,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    Switch,
  } from '@appica/ui-svelte'

  let dir: 'ltr' | 'rtl' = $state('ltr')
  let fruit = $state('orange')
</script>

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Select</h2>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Usage</p>
    <div class="max-w-sm">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectGroupLabel>Citrus</SelectGroupLabel>
            <SelectItem value="orange" label="Orange">Orange</SelectItem>
            <SelectItem value="lemon" label="Lemon">Lemon</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectGroupLabel>Berries</SelectGroupLabel>
            <SelectItem value="strawberry" label="Strawberry">Strawberry</SelectItem>
            <SelectItem value="blueberry" label="Blueberry" disabled>Blueberry</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Clearable</p>
    <div class="max-w-sm">
      <Select defaultValue="orange">
        <SelectTrigger clearable>
          <SelectValue placeholder="Clearable" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="orange" label="Orange">Orange</SelectItem>
          <SelectItem value="lemon" label="Lemon">Lemon</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Controlled</p>
    <div class="max-w-sm">
      <Select bind:value={fruit}>
        <SelectTrigger>
          <SelectValue placeholder="Fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="orange" label="Orange">Orange</SelectItem>
          <SelectItem value="lemon" label="Lemon">Lemon</SelectItem>
          <SelectItem value="mango" label="Mango">Mango</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <p class="text-foreground-subtle text-xs">Value: {fruit}</p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">Disabled and error</p>
    <div class="flex max-w-sm flex-col gap-3">
      <Select disabled defaultValue="orange">
        <SelectTrigger>
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="orange" label="Orange">Orange</SelectItem>
        </SelectContent>
      </Select>
      <Field invalid>
        <FieldLabel>Fruit</FieldLabel>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Needs a value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="orange" label="Orange">Orange</SelectItem>
            <SelectItem value="lemon" label="Lemon">Lemon</SelectItem>
          </SelectContent>
        </Select>
        <FieldError>Pick a fruit.</FieldError>
      </Field>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir} class="max-w-sm">
        <Select defaultValue="orange">
          <SelectTrigger>
            <SelectValue placeholder="Pick a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="orange" label="Orange">Orange</SelectItem>
            <SelectItem value="lemon" label="Lemon">Lemon</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </DirectionProvider>
  </div>
</section>
