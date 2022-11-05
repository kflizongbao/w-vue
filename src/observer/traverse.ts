
export  default function traverse(val: Object) {
    _traverse(val, ids);
    ids.clear();
}

const ids = new Set<Number>();

// 深度递归收集依赖
function _traverse(val: any, ids: Set<Number>) {
    // 此处需要数据校验
    if (val.__ob__) {
        const depId = val.__ob__.dep.id;
        if (ids.has(depId)) {
            return;
        }
        ids.add(depId);
    }
    if (Array.isArray(val)) {
        for (let index = 0; index < val.length; index++) {
            _traverse(val[index], ids);
        }
    } else {
        const keys = Object.keys(val);
        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];
            _traverse(element, ids);
        }
    }
}