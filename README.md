# hooks (Typescript)⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀[![npm version](https://badge.fury.io/js/%40edunad%2Fhooks.svg)](https://badge.fury.io/js/%40edunad%2Fhooks) [![Coverage Status](https://coveralls.io/repos/github/edunad/hooks/badge.svg?branch=master)](https://coveralls.io/github/edunad/hooks?branch=master) [![Build Status](https://travis-ci.org/edunad/hooks.svg?branch=master)](https://travis-ci.org/edunad/hooks)
## **LITE Unique Id observables** based on [garrysmod hooks](https://wiki.garrysmod.com/page/hook)

## Installation
```
npm install @edunad/hooks
```

## Examples
>### Local Hooks
 ```
     class myclass {
         public hook: Hook<string> = new Hook<string>();
 
         public hello(): void {
             hook.emit('world'); // Transmit "world" to all subscriptions
         }
     }

     class mylistener {
         private hookSub: HookSubscription;
         public registerHooks(): void {
             this.hookSub = myclass.hook.add('my-unique-id', (t: string) = {
                 console.debug(t); // Will print "world"
             });
         }
 
         public unsubHooks(): void {
             // Remove subscription
 
             hookSub.destroy(); // or
             hook.remove(hookSub); // or
             hook.remove('my-unique-id');
         }
     }
```

>### Global Hooks
```
    hooks.add('game-think', 'my-unique-hook', (t: string) = {
        console.debug(t); // Will print "world"
    });

    hooks.add('game-think', 'my-unique-hook-2', (t: string) = {
        console.debug(t); // Will print "world"
    });

    hooks.emit('game-think', 'world');
    hooks.remove('game-think', 'my-unique-hook'); // Remove hook
```
