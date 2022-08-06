let id = 0;
import Watcher from './watcher';

let currentWatcher: Watcher;
export default class Dep {
    id: number;
    subs: Watcher[];

    constructor() {
        this.id = id++;
        this.subs = [];
    }

    depend() {
        if (currentWatcher) {
        
        }
    }

    addSub(watcher: Watcher) {
        this.subs.push(watcher);
    }

    removeSub(watcher: Watcher) {
        const idx = this.subs.indexOf(watcher);
        if (idx >= 0) {
            this.subs.splice(idx, 1);
        }
    }

    notify() {
        const subs = this.subs.slice();
        for (let i = 0, l = subs.length; i < l; i++) {
            const watcher = subs[i];
            watcher.update();
        }
    }

};

