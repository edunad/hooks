import { HookSubscription } from './hookSubscription';
import { HookListener } from '../types/hookListener';

export class Hook<T> {
    private hooks: { [id: string]: HookListener<T> } = {};

    public add(id: string, listener: HookListener<T>): HookSubscription {
        this.hooks[id] = listener;
        return new HookSubscription(id, () => {
            this.remove(id);
        });
    }

    public remove(hookId: string | HookSubscription): void {
        if(hookId instanceof HookSubscription){
            return this.remove(hookId.id);
        }

        delete this.hooks[hookId];
    }

    public emit(emitData: T): void {
        Object.keys(this.hooks).forEach((hookId: string) => {
            if(this.hooks[hookId] == null) return;
            this.hooks[hookId](emitData);
        });
    }

    public getListeners(): { [id: string]: HookListener<T> } {
        return this.hooks;
    }
}