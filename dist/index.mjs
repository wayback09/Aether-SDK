// src/index.ts
function onReady(fn) {
  if (typeof setTimeout !== "undefined") {
    setTimeout(fn, 0);
  } else {
    fn();
  }
}
function createLogger(name) {
  return {
    info: (...args) => console.log(`[INFO] [${name}]`, ...args),
    warn: (...args) => console.warn(`[WARN] [${name}]`, ...args),
    error: (...args) => console.error(`[ERROR] [${name}]`, ...args)
  };
}
function defineProvider(spec) {
  if (!Aether || !Aether.launcher) {
    throw new Error("Aether.launcher API is not available. Did you request the 'launcher:modloader' permission?");
  }
  if (!spec.id || !spec.name || !spec.onLaunch) {
    throw new Error("Provider spec must include 'id', 'name', and 'onLaunch'.");
  }
  Aether.launcher.registerModLoader(spec);
}
function assertPermission(permissionName) {
  const permMap = {
    "ui:sidebar": () => !!Aether?.ui?.registerSidebarPage,
    "instances:list": () => !!Aether?.instances?.list,
    "mods:install": () => !!Aether?.instances?.installMod,
    "network:http": () => !!Aether?.http?.get,
    "fs:download": () => !!Aether?.fs?.download,
    "launcher:modloader": () => !!Aether?.launcher?.registerModLoader,
    "skin:export": () => !!Aether?.skins?.export
  };
  const check = permMap[permissionName];
  if (check && !check()) {
    throw new Error(`Permission denied or unavailable: '${permissionName}'. Please declare it in your manifest.json.`);
  }
}
export {
  assertPermission,
  createLogger,
  defineProvider,
  onReady
};
//# sourceMappingURL=index.mjs.map