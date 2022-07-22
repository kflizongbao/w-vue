/*

*/
import wVue from "./index";
import { updateListeners } from "../vdom/update-listeners";

let target: any;

function createInvokeOnceHandler(evt: string, fn: Function) {
    // 只执行一次的回调需要移除
    const _target = target;
    return function() {
        _target.$off(evt, fn);
        fn.apply(null, arguments);// thisArg不用传参，因为函数是绑定函数

        /**
         * vue 在此处判断函数的返回值，如果是null就不移除回调，为什么
         * 
         * 
        */
    };
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
    vm._hasHookEvents = false; //执行生命周期hook回调

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

    $on(evt: string | Array<string>, fn: Function) {
        const vm: wVue = this;
        if (Array.isArray(evt)) {
            // 确保添加没一个回调
            for (let i =0, l = evt.length; i < l ; i++) {
                vm.$on(evt[i], fn);
            }
        } else {
            if (vm._events[evt]) {
                vm._events[evt] = [];
            }
            vm._events[evt].push(fn);
            if (evt.startsWith('hook')) {
                vm._hasHookEvents = true;
            }
        }
    }

    $off(evt: string | Array<string>, fn: Function) {
        const vm: wVue = this;
        if (arguments.length <= 0) {
            vm._events = Object.create(null);
        }
        if (Array.isArray(evt)) {
            // 确保添加没一个回调
            for (let i = 0, l = evt.length; i < l ; i++) {
                vm.$off(evt[i], fn);
            }
        } else {
            const cbs = vm._events[evt];
            const idx = cbs.indexOf(fn);
            if (idx >= 0) {
                cbs.splice(idx, 1);
            }
        }
    }

    $emit(evt: string, fn: Function) {
        const vm: wVue = this;
        const fns = vm[evt];
        for (let i = 0, l = fns.length; i < l ; i++) {
            fns.apply(null, Array.prototype.slice.call(arguments, 1));
        }
    }

    $once(evt: string, fn: Function) {
        const vm: wVue = this;
        function once() {
            vm.$off(evt, fn);
            fn.apply(null, arguments);
        }
        vm.$on(evt, once);
    }
    
}