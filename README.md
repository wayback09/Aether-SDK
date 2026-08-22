# Aether SDK (@aethermc/sdk)

<p align="center">
  <a href="https://discord.gg/pQc9NnGhpG">
    <img src="https://img.shields.io/badge/discord-Join%20our%20Discord-5865F2?logo=discord&logoColor=white&style=for-the-badge" alt="Discord">
  </a>
</p>

The Aether SDK provides the core TypeScript definitions and helper utilities needed to develop extensions for the Aether Minecraft Launcher.

## Installation

```bash
npm install --save-dev @aethermc/sdk
```


## Features

- **Full Type Safety:** Comprehensive TypeScript interfaces for the `Aether` global object injected by the Goja runtime.
- **Helper Utilities:**
  - `onReady()`: Ensures safe script execution post-sandbox initialization.
  - `createLogger(name)`: Provides simple namespaced console logging.
  - `defineProvider(spec)`: Type-safe Mod Loader registration.
  - `assertPermission(perm)`: Validates that permissions are available before executing restricted API calls.

## Usage

In your extension's `main.js` (or `main.ts`):

```typescript
import { onReady, createLogger, assertPermission } from '@aethermc/sdk';

const log = createLogger('my-extension');

onReady(() => {
    log.info('Extension started!');

    // Ensure we have permission
    assertPermission('ui:sidebar');

    // Safely use the strongly-typed Aether object
    Aether.ui.registerSidebarPage({
        id: 'my-extension-page',
        label: 'My Extension',
        url: 'ui/index.html'
    });
});
```

## License

Licensed under the GNU General Public License v3.0 only. See [LICENSE](LICENSE).
