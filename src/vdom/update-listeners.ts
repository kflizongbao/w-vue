import wVue from "../core/index";
import { isDef, isUnDef } from "../util/index";

function normalizeEvent(name: string) {
    // & passive
    // ~once
    // !capture
    // 事件指令标准化
    const passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    const once = name.charAt(0) === '~';
    name = once ? name.slice(1) : name;
    const capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;

    return {
        name,
        passive,
        once,
        capture
    };
}

function createInvokeHandler(fns: Function | Array<Function>, vm: wVue) {
    function invoker() {
        // 减少闭包提升性能
        if (Array.isArray(invoker.fn)) {
            const clonedFn = invoker.fn.slice();//避免以为移除事件引起回调未调用
            for (let i = 0; i < clonedFn.length; i++) {
                clonedFn[i].apply(null, arguments);    
            }
        } else {
            invoker.fn.apply(null, arguments);    
        }
    };
    invoker.fn = fns;
    return invoker;
}

export function updateListeners(on: any, oldOn: any, add: Function, remove: Function, createInvokeOnceHandler: Function, vm: wVue) {
    // 事件绑定如何处理内存泄漏
    for (const k in on) {
        let listener = on[k];
        let listenerOld = oldOn[k];
        // 数据有效性校验
        const evt = normalizeEvent(k);
        if (isUnDef(listenerOld)) {
            // 新添加的监听
            if (isUnDef(listenerOld.fn)) {
                listener = on[k] = createInvokeHandler(listener, vm);
            }
    
            if (evt.once) {
                listener = on[k] = createInvokeOnceHandler(evt.name, listener);
            }
            add(evt.name, listener, vm);
        } else if (listener !== listenerOld) {
            listenerOld.fn = listener;//更新旧事件回调防止内存泄漏
        }
    }

    for (const k in oldOn) {
        if (isUnDef(on[k])) {
            const evt = normalizeEvent(k);
            remove(evt.name, oldOn[k], vm);
        }
    }
}