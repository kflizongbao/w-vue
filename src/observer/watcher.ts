import { default as Dep, pushWatcher, popWatcher } from './dep';
import { parsePath } from '../util/lang';
import traverse from './traverse';
import { queueWatcher } from './scheduler';

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

    lazy: boolean; // 延迟计算
    user: boolean; // 用户定义
    deep: boolean; // 深度监听
    dirty: boolean; // 数据是否更改
    sync: boolean; // 是否同步更新
    getter: Function; // 表达式
    cb: Function; // 变动回调
    vm: any; // 关联组件
    value: any;
    expression: string;
    depIds: Set<Number>;
    newDepIds: Set<Number>;
    deps: Dep[];
    newDeps: Dep[];

    constructor(vm: any, exp: string | Function, cb: Function, options: WatcherOptions, isRenderWatcher: boolean) {
        this.id = ++id;
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

        this.deps = [];
        this.depIds = new Set();
        this.newDeps = [];
        this.newDepIds = new Set();

        this.value = this.lazy ? undefined : this.get();
    }

    get() {
        pushWatcher(this);
        let value;
        try {
            value = this.getter.call(this.vm, this.vm);
        } catch (error) {
            
        } finally {
            if (this.deep) {
                traverse(value);
            }
            this.cleanupDeps();
        }
    }

    update() {
        if (this.lazy) {
            this.dirty = true;
        } else if (this.sync) {
            this.run();
        } else {
            queueWatcher(this);
        }
    }

    cleanupDeps() {
        let t = this.depIds;
        this.depIds = this.newDepIds;
        t.clear();
        this.newDepIds = t;

        let t0 = this.deps;
        this.deps = this.newDeps;
        t0.splice(0, t0.length);
        this.newDeps = t0;
    }

    addDep(dep: Dep) {
        if (this.newDepIds.has(dep.id)) {
            return;
        }
        this.newDepIds.add(dep.id);
        this.newDeps.push(dep);
    }

    run() {
        // 如果数据变更
        // 如果是深度监听
        const val = this.getter.call(this.vm, this.vm);
        if (val !== this.value || this.deep) {
            if (this.user) {
                this.cb.call(this.vm, val, this.value)
            } else {
                this.cb.call(this.vm, val, this.value)
            }
        }
    }
};