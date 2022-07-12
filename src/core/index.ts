// 青海长云暗雪山
// 孤城遥望玉门关
// 黄沙百战穿金甲
// 不破楼兰终不还

/*
    模块化之后工程需要导入相关的功能
    1、组件初始化函数
    2、观察对象相关
    3、事件相关
    4、生命周期相关
    5、渲染相关
*/
import { lifecycle } from './lifecycle';
import { apply } from '../util/mixins';


class wVue {
    constructor() {
        
    }
}

apply(wVue, [lifecycle]);

// 开始注入私有方法
export default wVue;