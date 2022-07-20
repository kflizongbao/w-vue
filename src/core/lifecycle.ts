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

    // 获取第一个非抽象的父组件
    // 抽象组件为非渲染组件
    while (parent && parent.abstract) {
        parent = parent.$parent;
    }
    parent.$children.push(vm);

    // 这些属性是生命周期内必须存在的
    vm.$parent = parent; // 组件时使用
    vm.$children = []; // 保存子组件渲染时使用

    vm.$root = parent?.$root??vm; // $root Vue实例组件，这个变量存在的意义是什么

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