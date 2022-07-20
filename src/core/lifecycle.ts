/*
    处理和生命周期相关的配置和函数
*/

import wVue from "./index";

function mountComponent() {

}

/*
 *  1、初始化实例
    2、挂载实例
 */
export function initLifecycle(vm: wVue) {
    const options = vm.$options;
    let parent = options?.parent;
    while (parent) {
        if (parent.abstract === false) {
            parent.$children.push(vm);
        } else {
            parent = parent.$parent;
        }
    }
    // 这些属性是生命周期内必须存在的
    vm.$parent = parent;
    vm.$children = [];
    vm._watcher = null;
    vm._isMounted = false;
    vm._isDestroyed = false;
}

export function callHook(vm: wVue, method: string) {


}

export class lifecycleMixins {
    // _开头的属性和方法是私有的
    // $开头的实行和方法是公有的
    _update() {

    }
    
    $forceUpdate() {
        
    }
    
    $destroy() {
        
    }

    $mount() {
        mountComponent.call(this);
    }

}