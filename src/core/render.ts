/*
    渲染
*/
import wVue from "./index";
import { nextTick } from "../util/next-tick";

export function initRender(vm: wVue) {

}

export class renderMixins {

    _render() {
        const vm:wVue = this;
        const { render, _parentNode} = vm.$options;
        vm.$vnode = _parentNode;

        const vnode = render.call(vm._renderProxy, vm.$createElement);
        vnode.parent = _parentNode;
        return vnode;
    }

    $nextTick(fn: Function) {
        nextTick(fn);
    }

}