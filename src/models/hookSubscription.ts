export class HookSubscription {
    public id: string;
    public destroy(): void {}

    constructor(hookId: string, destroyCallback: () => void) {
        this.id = hookId;
        this.destroy = destroyCallback;
    }
}