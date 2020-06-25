import { HookSubscription } from './hookSubscription';
import { HookListener } from '../types/hookListener';

export class Hook<T> {
    private hooks: { [id: string]: HookListener<T> } = {};
    private static __ID: number = 0;

    public addUnique(listener: HookListener<T>): HookSubscription {
        return this.add((++Hook.__ID).toString(), listener);
    }

    public add(id: string, listener: HookListener<T>): HookSubscription {
        if(id == null) throw new Error('[Hooks] Id cannot be null, use "addUnique" instead');
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
        const keys: string[] = Object.keys(this.hooks);

        for ( let i: number = keys.length; i--; ) {
            if(this.hooks[keys[i]] == null){
                this.remove(keys[i]);
                continue;
            }

            this.hooks[keys[i]](emitData);
        }
    }

    public getListeners(): { [id: string]: HookListener<T> } {
        return this.hooks;
    }
}