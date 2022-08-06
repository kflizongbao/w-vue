import arrayIntercept from './arr';
export class Observer {

  constructor(val: any) {
    // 非对象
    // 如果已经响应式了
    // 如果禁止了响应式
    // 组件本身的属性不需要追踪

    // 关联响应式对象
    defineObserver(val, this);

    // 业务逻辑
    if (Array.isArray(val)) {
      // 修改原型链
      Object.setPrototypeOf(val, arrayIntercept);
      observeArray(val);
    } else {
      observe(val);
    }
  }






}

function defineObserver(obj: any, ob: Observer) {
  // 禁止删除
  // 禁止遍历
  // 禁止修改

  Object.defineProperty(obj, '__ob__', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: ob,
  });
}

function observeArray(arr: Array<Object>) {
  for (let i = 0; i < arr.length; i++) {
    new Observer(arr[i]);
  }
}

function observe(val: any) {
  // 校验
  if (val.hasOwnProperty('__ob__')) {
    return val.__ob__;
  }

  for (const k in val) {
    defineReactive(val, k , val[k]);
  }
}

export function defineReactive(obj: Object, k: string, val: any, customSetter?: Function | null) {

  Object.defineProperty(obj, k, {
    configurable: true,
    enumerable: true,
    writable: true,
    get: function getReactive() {

    },
    set: function setReactive() {

    },
  });
}