"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  assertPermission: () => assertPermission,
  createLogger: () => createLogger,
  defineProvider: () => defineProvider,
  onReady: () => onReady
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assertPermission,
  createLogger,
  defineProvider,
  onReady
});
//# sourceMappingURL=index.js.map