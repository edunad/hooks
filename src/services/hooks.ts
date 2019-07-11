import { Hook } from '../models/hook';

// Global hooks
export class hooks {
    private static hooks: { [id: string]: Hook<any> } = {};
    public static add(event: string, id: string, callback: (event: any) => any): void {
        if(this.hooks[event] == null) {
            this.hooks[event] = new Hook<any>();
        }

        this.hooks[event].add(id, callback);
    }

    public static remove(event: string, id: string): void {
        if(this.hooks[event] == null) return;
        this.hooks[event].remove(id);
    }

    public static emit(event: string, emitData: any): void {
        if(this.hooks[event] == null) return;
        this.hooks[event].emit(emitData);
    }

    public static getHook(id: string): Hook<any> {
        return this.hooks[id];
    }

    public static getHooks(): { [id: string]: Hook<any> } {
        return this.hooks;
    }
}