let id = 0;
import Watcher from './watcher';

export default class Dep {
    id: number;
    subs: Watcher[];

    constructor() {
        this.id = id++;
        this.subs = [];
    }

    depend() {
        if (currentWatcher) {
            currentWatcher.addDep(this);
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

export let currentWatcher: Watcher;
const targetArr: Watcher[] = [];

export function pushWatcher(target: Watcher) {
    targetArr.push(currentWatcher = target);
}

export function popWatcher(target: Watcher) {
    targetArr.pop();
    currentWatcher = targetArr[targetArr.length - 1];
}

