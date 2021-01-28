import { hooks } from "../../src/services/hooks";

describe('hooks', () => {
    it('Succeeds global hook add does not throw error', () => {
        expect(() => hooks.add('think', 'my-think', (data: number) => {})).not.toThrowError();

        expect(hooks.getHook('random')).toBe(undefined);
        expect(hooks.getHook('think')).not.toBe(null);
        expect(Object.keys(hooks.getHooks()).length).toBe(1);
        expect(Object.keys(hooks.getHook('think').getListeners()).length).toBe(1);
    });

    it('Succeeds global hook remove does not throw error', () => {
        expect(() => hooks.add('think', 'my-think', (data: number) => {})).not.toThrowError();

        expect(hooks.getHook('think')).not.toBe(null);
        expect(Object.keys(hooks.getHook('think').getListeners()).length).toBe(1);

        expect(() => hooks.remove('think', 'my-think')).not.toThrowError();
        expect(Object.keys(hooks.getHook('think').getListeners()).length).toBe(0);

        expect(() => hooks.remove('invalid-hook-id', 'invalid-hook-id')).not.toThrowError();
    });

    it('Succeeds global hook emit does not throw error', (cb) => {
        expect(() => hooks.add('think', 'my-think', (data: number) => {
            expect(data).not.toBe(null);
            expect(data).toBe(1);

            return cb();
        })).not.toThrowError();

        expect(hooks.getHook('think')).not.toBe(null);
        expect(Object.keys(hooks.getHook('think').getListeners()).length).toBe(1);
        expect(() => hooks.emit('think', 1)).not.toThrowError();
        expect(() => hooks.emit('invalid-hook-id', 1)).toThrowError(`[Hooks] Unknown global hook event {invalid-hook-id}, forgot to add?`);
    });
});