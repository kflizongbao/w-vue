
/*

*/
import { initLifecycle, callHook }  from './lifecycle';
import { initState }  from './state';
import { initEvents }  from './events';
import { initRender }  from './render';

interface vueOptions {

}

interface componentOptions extends vueOptions {
    [index: string] : any;
}


export class initMixins {
    [x: string]: any;

    _init(options: componentOptions) {
        // 初始化默认的配置 _parentNode _props _listeners _options
        if (options?._isComponent) {
            // 初始化组件的配置
        } else {
            // 初始化Vue配置
        }
        // 编译生成_render函数
        initLifecycle(this, options);
        initEvents(this, options);
        initRender(this, options);
        // beforeCreate
        callHook(this, 'beforeCreate');
        initState(this, options);
        // created
        callHook(this, 'created');
        this.$mount();
    }
    
}