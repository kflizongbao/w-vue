
export class Observer {

  constructor(val: any) {
    // 非对象
    // 如果已经响应式了
    // 如果禁止了响应式
    // 组件本身的属性不需要追踪

    // 校验
    if (val.hasOwnProperty('__ob__')) {
      return val.__ob__;
    }

    // 业务逻辑
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        new Observer(val[i]);
      }
    } else {
      return observe(val, this);
    }

  }






}

function observe(val: any, ob: Observer) {
  for (const k in val) {
    defineReactive(val, k , val[k]);
  }

  // 禁止删除
  // 禁止遍历
  // 禁止修改
  Object.defineProperty(val, '__ob__', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: {
      value: val 
    }
  });

  return ob;
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