import { Hook } from '../../src/models/hook';
import { HookSubscription } from '../../src/models/hookSubscription';

describe('Hooks', () => {
    it('Succeeds when add returns a HookSubscription', () => {
        let hook: Hook<number> = new Hook<number>();
        let hookSub: HookSubscription = hook.add('test', (t: number) => {});

        expect(hookSub).not.toBe(null);
        expect(hookSub.id).toBe('test');
    });

    it('Succeeds when addUnique returns a HookSubscription', () => {
        let hook: Hook<number> = new Hook<number>();
        let hookSub: HookSubscription = hook.addUnique((t: number) => {});

        expect(hookSub).not.toBe(null);
        expect(hookSub.id).toBe('1');
    });

    it('Fails when add does not recieve an id', () => {
        let hook: Hook<number> = new Hook<number>();
        expect(() => hook.add(null, (t: number) => {})).toThrowError('[Hooks] Id cannot be null, use "addUnique" instead');
    });

    it('Succeeds when destroy to remove from hooks', () => {
        let hook: Hook<number> = new Hook<number>();
        let hookSub: HookSubscription = hook.add('test', (t: number) => {});

        expect(hookSub).not.toBe(null);
        expect(hook.getListeners()).not.toBe(null);
        expect(Object.keys(hook.getListeners()).length).toBe(1);

        hookSub.destroy();
        expect(Object.keys(hook.getListeners()).length).toBe(0);
    });

    it('Succeeds when remove removes from hooks', () => {
        let hook: Hook<number> = new Hook<number>();
        let hookSub: HookSubscription = hook.add('test', (t: number) => {});
        let hookSub_2: HookSubscription = hook.add('test_2', (t: number) => {});

        expect(hookSub).not.toBe(null);
        expect(hookSub_2).not.toBe(null);

        expect(Object.keys(hook.getListeners()).length).toBe(2);
        expect(() => hook.remove('test')).not.toThrowError();
        expect(Object.keys(hook.getListeners()).length).toBe(1);

        expect(() => hook.remove(hookSub_2)).not.toThrowError();
        expect(Object.keys(hook.getListeners()).length).toBe(0);
    });

    it('Succeeds when emit returns correct type', (cb) => {
        let hook: Hook<number> = new Hook<number>();
        let hookSub: HookSubscription = hook.add('test', (t: number) => {
            expect(t).not.toBe(null);
            expect(t).toBe(10);

            return cb();
        });

        expect(hookSub).not.toBe(null);
        expect(Object.keys(hook.getListeners()).length).toBe(1);
        expect(() => hook.emit(10)).not.toThrowError();
    });

    it('Succeeds when emit removes nulled ids', () => {
        let hook: Hook<number> = new Hook<number>();
        let hookSub: HookSubscription = hook.add('test', (t: number) => {});

        expect(hookSub).not.toBe(null);
        expect(() => hook.getListeners()['test'] = null).not.toThrowError();
        expect(() => hook.emit(10)).not.toThrowError();
        expect(Object.keys(hook.getListeners()).length).toBe(0);
    });
});