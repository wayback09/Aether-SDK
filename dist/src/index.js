"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReady = onReady;
exports.createLogger = createLogger;
exports.defineProvider = defineProvider;
exports.assertPermission = assertPermission;
__exportStar(require("./global"), exports);
function onReady(fn) {
    // Currently the Goja environment executes main.js when ready.
    // We wrap it in a microtask/setTimeout to ensure all sync script loading is done.
    if (typeof setTimeout !== 'undefined') {
        setTimeout(fn, 0);
    }
    else {
        // Fallback if setTimeout isn't polyfilled in Goja
        fn();
    }
}
function createLogger(name) {
    return {
        info: (...args) => console.log(`[INFO] [${name}]`, ...args),
        warn: (...args) => console.warn(`[WARN] [${name}]`, ...args),
        error: (...args) => console.error(`[ERROR] [${name}]`, ...args),
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
    // A crude check: we can infer permission by checking if the corresponding API exists.
    // In a future version, Aether might expose Aether.permissions.has(perm).
    const permMap = {
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
