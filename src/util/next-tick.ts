
/**
 * ep: this.$nextTick(() => {
 *      codes
 * });
 * 此方法需要考虑浏览器的兼容性
 * setTimeout
 * MutationObserver
 * 
*/
const callbacks: Array<Function> = [];
let pending = false;

// 此函数不支持返回Promise
export function nextTick(fn: Function) {
    callbacks.push(fn);

    if (!pending) {
        pending = true;
        // 下一个循环执行
        Promise.resolve().then(() => {
            pending = false;
            const pros = callbacks.slice();
            for (let i = 0; i < pros.length; i++) {
                pros[i].call(null);
                callbacks.shift();
            }
        });
    }
}