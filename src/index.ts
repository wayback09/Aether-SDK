export * from './global';

export function onReady(fn: () => void) {
  // Currently the Goja environment executes main.js when ready.
  // We wrap it in a microtask/setTimeout to ensure all sync script loading is done.
  if (typeof setTimeout !== 'undefined') {
    setTimeout(fn, 0);
  } else {
    // Fallback if setTimeout isn't polyfilled in Goja
    fn();
  }
}

export function createLogger(name: string) {
  return {
    info: (...args: any[]) => console.log(`[INFO] [${name}]`, ...args),
    warn: (...args: any[]) => console.warn(`[WARN] [${name}]`, ...args),
    error: (...args: any[]) => console.error(`[ERROR] [${name}]`, ...args),
  };
}

export function defineProvider(spec: {
  id: string;
  name: string;
  description: string;
  onLaunch: (ctx: any) => any;
}) {
  if (!Aether || !Aether.launcher) {
    throw new Error("Aether.launcher API is not available. Did you request the 'launcher:modloader' permission?");
  }
  
  if (!spec.id || !spec.name || !spec.onLaunch) {
    throw new Error("Provider spec must include 'id', 'name', and 'onLaunch'.");
  }

  Aether.launcher.registerModLoader(spec);
}

export function assertPermission(permissionName: string) {
  // A crude check: we can infer permission by checking if the corresponding API exists.
  // In a future version, Aether might expose Aether.permissions.has(perm).
  const permMap: Record<string, () => boolean> = {
    'ui:sidebar': () => !!(Aether?.ui?.registerSidebarPage),
    'instances:list': () => !!(Aether?.instances?.list),
    'mods:install': () => !!(Aether?.instances?.installMod),
    'network:http': () => !!(Aether?.http?.get),
    'fs:download': () => !!(Aether?.fs?.download),
    'launcher:modloader': () => !!(Aether?.launcher?.registerModLoader),
    'skin:export': () => !!(Aether?.skins?.export),
  };

  const check = permMap[permissionName];
  if (check && !check()) {
    throw new Error(`Permission denied or unavailable: '${permissionName}'. Please declare it in your manifest.json.`);
  }
}
