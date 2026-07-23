export * from './global';
export declare function onReady(fn: () => void): void;
export declare function createLogger(name: string): {
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
export declare function defineProvider(spec: {
    id: string;
    name: string;
    description: string;
    onLaunch: (ctx: any) => any;
}): void;
export declare function assertPermission(permissionName: string): void;
