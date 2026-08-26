<script lang="ts">
  import { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle, Button } from '@appica/ui-svelte'
</script>

<section class="flex flex-col gap-4">
  <h2 class="text-foreground-emphasis text-lg font-semibold">Alert</h2>
  <Alert dismissible>
    <AlertIcon>
      <span>i</span>
    </AlertIcon>
    <AlertTitle>System message</AlertTitle>
    <AlertDescription>Dismiss this alert to exercise the exit transition.</AlertDescription>
    <AlertAction>
      <Button size="sm" variant="outline">Action</Button>
    </AlertAction>
  </Alert>
  <Alert variant="success" layout="inline">
    <AlertIcon>
      <span>✓</span>
    </AlertIcon>
    <AlertTitle>Saved</AlertTitle>
    <AlertDescription>Inline layout when the container is wide enough.</AlertDescription>
  </Alert>
</section>
