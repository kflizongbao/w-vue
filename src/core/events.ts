/*

*/
import wVue from "./index";

export function initEvents(vm: wVue) {
    // 保存父节点传递的回调函数
    vm._events = {};
    const options = vm.$options;
    const listeners = options._parentListeners;
    for (const type in listeners) {
        if (!vm._events[type]) {
            vm._events[type] = [];
        }
        vm._events[type].push(listeners[type]);
    }
}

export class eventsMixins {

    $on() {

    }

    $off() {

    }

    $emit() {

    }


}