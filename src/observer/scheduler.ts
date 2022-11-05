
import Watcher from './watcher';
import { nextTick } from '../util/next-tick';

const queue: Watcher[] = [];
let firing = false;
let adding = false;

function fire() {
    firing = true;
    const queueFire = queue.slice();
    for (let index = 0; index < queueFire.length; index++) {
        const watcher = queueFire[index];
        watcher.run();
    }
    firing = false;
    adding = false;
}

export function queueWatcher(watcher: Watcher) {
    // 更新一个队列的所有
    if (firing) {
        for (let index = 0; index < queue.length; index++) {
            const element = queue[index];
            if (element.id === watcher.id) {
                queue.splice(index, 1, watcher);
                break;
            }
        }
    } else {
        queue.push(watcher);
    }

    if (adding) {
        nextTick(fire);
        adding = true;
    }
}