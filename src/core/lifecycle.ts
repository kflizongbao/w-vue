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
export function initLifecycle(vm: wVue, options: any) {

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