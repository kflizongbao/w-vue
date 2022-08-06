export function parsePath(path: string): any {
    if (!path) {
        return;
    }
    // 递归获取值
    const paramPath = path.split('.');
    return function(vm: any) {
        let v = vm;
        for (let i = 0, l = paramPath.length; i < l ; i++) {
            v = v[paramPath[i]];
            if (!v) {
                return v;
            }
        }
        return v;
    };
}