export interface AetherAPI {
  ui: {
    registerSidebarPage(opts: { id: string; label: string; url: string }): void;
    openDialog(opts: any): void;
    onMessage(callback: (payload: any) => any): void;
    postMessage(payload: any): void;
  };
  instances: {
    list(): { id: string; name: string; version: string; loader: string }[];
    installMod(instanceId: string, jarName: string, downloadURL: string): string;
    listMods(instanceId: string): string[];
    deleteMod(instanceId: string, jarName: string): void;
    toggleMod(instanceId: string, jarName: string, enable: boolean): void;
  };
  http: {
    get(url: string): string;
  };
  fs: {
    download(url: string, destPath: string): string;
  };
  launcher: {
    registerModLoader(config: { id: string; name: string; description: string; onLaunch: (ctx: any) => any }): void;
  };
  skins: {
    export(base64Data: string, filename: string): string;
  };
}

declare global {
  const Aether: AetherAPI;
}
