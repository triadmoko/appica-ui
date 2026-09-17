<script lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    DirectionProvider,
    ScrollArea,
    Switch,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@appica/ui-svelte'

  const transactionRows = [
    { date: 'Aug 30', description: 'Salary', amount: '+ $4,150.00' },
    { date: 'Aug 24', description: 'Netflix', amount: '- $20.00' },
    { date: 'Aug 17', description: 'Electricity', amount: '- $186.35' },
    { date: 'Aug 12', description: 'Grocery store', amount: '- $74.20' },
  ]

  const sizes = ['sm', 'md', 'lg'] as const

  const planRows = [
    { name: 'Starter', seats: '1-3', price: '$0' },
    { name: 'Team', seats: 'Up to 20', price: '$12' },
  ]

  const regionRows = [
    { region: 'North America', q3: '$48.2k', q4: '$52.9k' },
    { region: 'Europe', q3: '$31.7k', q4: '$36.4k' },
    { region: 'Asia Pacific', q3: '$22.1k', q4: '$28.8k' },
    { region: 'Latin America', q3: '$9.4k', q4: '$11.2k' },
  ]

  const fileRows = [
    { file: 'annual-report.pdf', size: '2.4 MB', modified: 'Aug 30' },
    { file: 'budget-2025.xlsx', size: '845 KB', modified: 'Aug 28' },
    { file: 'logo-final.svg', size: '12 KB', modified: 'Aug 21' },
    { file: 'roadmap.key', size: '6.1 MB', modified: 'Aug 14' },
  ]

  const borderStyles = ['solid', 'dashed', 'none'] as const

  const peopleRows = [
    { name: 'Sarah Jenkins', role: 'Engineer' },
    { name: 'Daniel Reyes', role: 'Designer' },
    { name: 'Mateo Rossi', role: 'Researcher' },
  ]

  const plans = [
    { name: 'Starter', seats: '1-3', price: '$0', current: false },
    { name: 'Team', seats: 'Up to 20', price: '$12', current: true },
    { name: 'Business', seats: 'Up to 100', price: '$29', current: false },
    { name: 'Enterprise', seats: 'Unlimited', price: 'Custom', current: false },
  ]

  const members = [
    {
      src: 'https://picsum.photos/id/64/80',
      name: 'Sarah Jenkins',
      email: 'sarah@appica.dev',
      role: 'Owner',
      status: 'Active',
    },
    {
      src: 'https://picsum.photos/id/65/80',
      name: 'Daniel Reyes',
      email: 'daniel@appica.dev',
      role: 'Editor',
      status: 'Active',
    },
    {
      src: 'https://picsum.photos/id/91/80',
      name: 'Mateo Rossi',
      email: 'mateo@appica.dev',
      role: 'Viewer',
      status: 'Invited',
    },
  ] as const

  const statusVariant = {
    Active: 'success',
    Invited: 'warning',
  } as const

  const scrollableRows = [
    { date: 'Aug 30', description: 'Salary', amount: '+ $4,150.00' },
    { date: 'Aug 28', description: 'Spotify', amount: '- $11.99' },
    { date: 'Aug 24', description: 'Netflix', amount: '- $20.00' },
    { date: 'Aug 22', description: 'Freelance invoice', amount: '+ $1,200.00' },
    { date: 'Aug 19', description: 'Coffee roasters', amount: '- $18.40' },
    { date: 'Aug 17', description: 'Electricity', amount: '- $186.35' },
    { date: 'Aug 14', description: 'Gym membership', amount: '- $39.00' },
    { date: 'Aug 12', description: 'Grocery store', amount: '- $74.20' },
    { date: 'Aug 09', description: 'Refund - returns', amount: '+ $52.10' },
    { date: 'Aug 06', description: 'Phone bill', amount: '- $45.00' },
    { date: 'Aug 03', description: 'Bookshop', amount: '- $28.75' },
    { date: 'Aug 01', description: 'Rent', amount: '- $1,650.00' },
  ]

  const wideRows = [
    {
      name: 'Sarah Jenkins',
      email: 'sarah@appica.dev',
      role: 'Owner',
      team: 'Product',
      location: 'San Francisco',
      joined: 'Jan 2021',
    },
    {
      name: 'Daniel Reyes',
      email: 'daniel@appica.dev',
      role: 'Editor',
      team: 'Engineering',
      location: 'Austin',
      joined: 'Mar 2022',
    },
    {
      name: 'Mateo Rossi',
      email: 'mateo@appica.dev',
      role: 'Viewer',
      team: 'Design',
      location: 'Milan',
      joined: 'Jul 2022',
    },
    {
      name: 'Amara Okafor',
      email: 'amara@appica.dev',
      role: 'Editor',
      team: 'Marketing',
      location: 'Lagos',
      joined: 'Nov 2023',
    },
    {
      name: 'Noah Patel',
      email: 'noah@appica.dev',
      role: 'Viewer',
      team: 'Support',
      location: 'Toronto',
      joined: 'Feb 2024',
    },
  ]

  let dir: 'ltr' | 'rtl' = $state('ltr')
</script>

{#snippet transactionsTable()}
  <Table>
    <TableCaption>Recent transactions</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Description</TableHead>
        <TableHead class="text-end">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each transactionRows as row (row.description)}
        <TableRow>
          <TableCell>{row.date}</TableCell>
          <TableCell class="text-foreground-strong font-medium">{row.description}</TableCell>
          <TableCell class="text-end tabular-nums">{row.amount}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
{/snippet}

<section class="flex flex-col gap-8">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Table</h2>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Default</p>
    {@render transactionsTable()}
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Sizes</p>
    <div class="flex w-full flex-col gap-8">
      {#each sizes as size (size)}
        <div class="flex flex-col gap-2">
          <span class="text-foreground-muted text-xs font-medium">size="{size}"</span>
          <Table {size}>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead class="text-end">Per month</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each planRows as row (row.name)}
                <TableRow>
                  <TableCell class="text-foreground-strong font-medium">{row.name}</TableCell>
                  <TableCell>{row.seats}</TableCell>
                  <TableCell class="text-end tabular-nums">{row.price}</TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Striped</p>
    <div class="flex w-full flex-col gap-8">
      <div class="flex flex-col gap-2">
        <span class="text-foreground-muted text-xs font-medium">stripedRows</span>
        <Table stripedRows>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead class="text-end">Q3</TableHead>
              <TableHead class="text-end">Q4</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each regionRows as row (row.region)}
              <TableRow>
                <TableCell class="text-foreground-strong font-medium">{row.region}</TableCell>
                <TableCell class="text-end tabular-nums">{row.q3}</TableCell>
                <TableCell class="text-end tabular-nums">{row.q4}</TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-foreground-muted text-xs font-medium">stripedColumns</span>
        <Table stripedColumns>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead class="text-end">Q3</TableHead>
              <TableHead class="text-end">Q4</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each regionRows as row (row.region)}
              <TableRow>
                <TableCell class="text-foreground-strong font-medium">{row.region}</TableCell>
                <TableCell class="text-end tabular-nums">{row.q3}</TableCell>
                <TableCell class="text-end tabular-nums">{row.q4}</TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Hoverable rows</p>
    <Table hoverableRows>
      <TableHeader>
        <TableRow>
          <TableHead>File</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Modified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each fileRows as row (row.file)}
          <TableRow>
            <TableCell class="text-foreground-strong font-medium">{row.file}</TableCell>
            <TableCell class="tabular-nums">{row.size}</TableCell>
            <TableCell>{row.modified}</TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Border styles</p>
    <div class="flex w-full flex-col gap-8">
      {#each borderStyles as borderStyle (borderStyle)}
        <div class="flex flex-col gap-2">
          <span class="text-foreground-muted text-xs font-medium">borderStyle="{borderStyle}"</span>
          <Table {borderStyle}>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each peopleRows as row (row.name)}
                <TableRow>
                  <TableCell class="text-foreground-strong font-medium">{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Highlighted row</p>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Plan</TableHead>
          <TableHead>Seats</TableHead>
          <TableHead class="text-end">Per month</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each plans as plan (plan.name)}
          <TableRow highlighted={plan.current}>
            <TableCell class="text-foreground-strong font-medium">{plan.name}</TableCell>
            <TableCell>{plan.seats}</TableCell>
            <TableCell class="text-end tabular-nums">{plan.price}</TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Rich content</p>
    <Table hoverableRows>
      <TableCaption position="top" class="text-foreground-intense text-start font-medium">
        Workspace members
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead class="text-end">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each members as member (member.email)}
          {@const initials = member.name
            .split(' ')
            .map((part) => part[0])
            .join('')}
          <TableRow>
            <TableCell>
              <div class="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarImage src={member.src} alt={member.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div class="flex flex-col">
                  <span class="text-foreground-emphasis font-medium">{member.name}</span>
                  <span class="text-xs">{member.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell class="text-end">
              <Badge variant={statusVariant[member.status]} size="sm">
                {member.status}
              </Badge>
            </TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Scrollable</p>
    <ScrollArea class="border-border-muted h-75 w-full max-w-md rounded-lg border p-2">
      <Table class="border-0 p-0 [&>thead>tr>th]:sticky [&>thead>tr>th]:top-0">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead class="text-end">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {#each scrollableRows as row (row.description)}
            <TableRow>
              <TableCell>{row.date}</TableCell>
              <TableCell class="text-foreground-strong font-medium">{row.description}</TableCell>
              <TableCell class="text-end tabular-nums">{row.amount}</TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </ScrollArea>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">Horizontal scroll</p>
    <ScrollArea orientation="horizontal" class="w-full max-w-md">
      <Table class="whitespace-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {#each wideRows as row (row.email)}
            <TableRow>
              <TableCell class="text-foreground-strong font-medium">{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.team}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.joined}</TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </ScrollArea>
  </div>

  <div class="flex flex-col gap-3">
    <p class="text-foreground-muted text-sm">RTL</p>
    <label class="flex items-center gap-2 text-sm">
      <Switch checked={dir === 'rtl'} onCheckedChange={(next) => (dir = next ? 'rtl' : 'ltr')} />
      RTL
    </label>
    <DirectionProvider {dir}>
      <div {dir}>
        {@render transactionsTable()}
      </div>
    </DirectionProvider>
  </div>
</section>
