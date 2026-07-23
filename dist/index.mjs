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
    "ui:sidebar": () => {
      var _a;
      return !!((_a = Aether == null ? void 0 : Aether.ui) == null ? void 0 : _a.registerSidebarPage);
    },
    "instances:list": () => {
      var _a;
      return !!((_a = Aether == null ? void 0 : Aether.instances) == null ? void 0 : _a.list);
    },
    "mods:install": () => {
      var _a;
      return !!((_a = Aether == null ? void 0 : Aether.instances) == null ? void 0 : _a.installMod);
    },
    "network:http": () => {
      var _a;
      return !!((_a = Aether == null ? void 0 : Aether.http) == null ? void 0 : _a.get);
    },
    "fs:download": () => {
      var _a;
      return !!((_a = Aether == null ? void 0 : Aether.fs) == null ? void 0 : _a.download);
    },
    "launcher:modloader": () => {
      var _a;
      return !!((_a = Aether == null ? void 0 : Aether.launcher) == null ? void 0 : _a.registerModLoader);
    },
    "skin:export": () => {
      var _a;
      return !!((_a = Aether == null ? void 0 : Aether.skins) == null ? void 0 : _a.export);
    }
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