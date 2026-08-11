import { Badge, Button, Input, Switch, Tabs, TabsContent, TabsList, TabsTrigger, useTheme } from '@appica/ui-react'

export function App() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <main className="text-foreground bg-background mx-auto flex min-h-dvh max-w-3xl flex-col gap-10 px-6 py-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground-intense text-3xl font-semibold">Appica UI Playground</h1>
          <p className="text-foreground-muted mt-1 text-sm">
            Scratch page for developing components - edit <code>packages/react/src</code> and it hot-reloads.
          </p>
        </div>
        <Button
          variant="outline"
          size="icon-md"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          ◑
        </Button>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-foreground-emphasis text-lg font-semibold">Sandbox</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Badge</Badge>
          <Switch defaultChecked />
        </div>
        <Input placeholder="Type something…" className="max-w-xs" />
        <Tabs defaultValue="one" className="max-w-md">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
            <TabsTrigger value="three">Three</TabsTrigger>
          </TabsList>
          <TabsContent value="one">First panel</TabsContent>
          <TabsContent value="two">Second panel</TabsContent>
          <TabsContent value="three">Third panel</TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
