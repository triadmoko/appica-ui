const { getDefaultConfig } = require('expo/metro-config')
const path = require('node:path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// pnpm monorepo resolution: watch the whole workspace, and look up node_modules
// in both the project and the workspace root (pnpm hoists less than npm/yarn).
config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPaths = [
  path.join(projectRoot, 'node_modules'),
  path.join(workspaceRoot, 'node_modules'),
]
// pnpm's node_modules are symlinked (not hoisted/flat), so each package already
// resolves its own direct deps correctly via its own node_modules — hierarchical
// lookup must stay enabled for that to work. Only enable symlink-following.
config.resolver.unstable_enableSymlinks = true

// Resolve the bare import straight to package *source* (not dist/) so component
// edits hot-reload without a rollup build — same trick as playgrounds/react's
// Vite alias.
config.resolver.extraNodeModules = {
  '@appica/ui-react-native': path.resolve(workspaceRoot, 'packages/react-native/src'),
}

module.exports = config
