import Dep from './dep';
import { parsePath } from '../util/lang';

interface WatcherSpec {
    id: number;
    update: Function;
}

interface WatcherOptions {
    lazy?: boolean;
    user?: boolean;
    deep?: boolean;
    dirty?: boolean;
    sync?: boolean;
}

let id = 0;
export default class Watcher implements WatcherSpec {
    id: number;
    deps: Dep[];

    lazy: boolean; // 延迟计算
    user: boolean; // 用户定义
    deep: boolean; // 深度监听
    dirty: boolean; // 数据是否更改
    sync: boolean; // 是否同步更新
    getter: Function; // 表达式
    cb: Function | null; // 变动回调
    vm: any; // 关联组件
    value: any;
    expression: string;

    constructor(vm: any, exp: string | Function, cb: Function, options: WatcherOptions, isRenderWatcher: boolean) {
        this.id = ++id;
        this.deps = [];

        this.vm = vm;

        if (options) {
            this.lazy = options.lazy ?? false;
            this.user = options.user ?? false;
            this.deep = options.deep ?? false;
            this.dirty = options.dirty ?? false;
            this.sync = options.sync ?? false;
        } else {
            this.lazy = false;
            this.user = false;
            this.deep = false;
            this.dirty = false;
            this.sync = false;
        }

        if (typeof exp === 'function') {
            this.getter = exp;
        } else {
            this.getter = parsePath(exp);
            // 此处可能非常规数据
        }
        this.expression = exp.toString();

        this.cb = cb;

        if (isRenderWatcher) {
            this.vm._watcher = this;
        }
        this.value = this.lazy ? undefined : this.get();
    }

    get() {
        const value = this.getter.call(this.vm, this.vm);
        this.value = value;
    }

    update() {

    }


};