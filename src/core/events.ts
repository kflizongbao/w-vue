/*

*/
import wVue from "./index";
import { updateListeners } from "../vdom/update-listeners";

let target: any;

function createInvokeOnceHandler() {

}

function add(evt: any, fn: Function) {
    target.$on(evt, fn);
}

function remove(evt: any, fn: Function) {
    target.$ff(evt, fn);
}

export function initEvents(vm: wVue) {
    // 保存父节点传递的回调函数
    vm._events = Object.create(null);
    // 创建一个没有原型的空对象
    // 优势1、不查询原型链提升性能
    //     2、没有多余的键降低内存
    target = vm;
    const options = vm.$options;
    const listeners = options._parentListeners;
    if (listeners) {
        updateListeners(listeners, null, add, remove, createInvokeOnceHandler, vm);
    }
    target = null;
}

export class eventsMixins {

    $on(evt: String | Array<String>, fn: Function) {
        const vm: wVue = this;
        if (Array.isArray(evt)) {
            vm.$on();
        } else {
            (vm._events[evt] || vm._events[evt] = []).push(fn);
        }
    }

    $off() {

    }

    $emit() {

    }

    $once() {

    }
    
}