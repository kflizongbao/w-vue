
const arrPrototype: Function[] = Array.prototype;
const arrayIntercept = Object.create(arrPrototype);
const monitorMethods: string[] = ['shift' , 'unshift', 'pop', 'push' , 'splice', 'reverse', 'sort'];

for (const method of monitorMethods) {
    Object.defineProperty(arrayIntercept, method, {
        configurable: true,
        enumerable: true,
        get() {
            if(isValidKey(method, arrPrototype)) {
                this.__ob__.dep.notify();
                return arrPrototype[method].apply(this, arguments);
            }
        }
    });
}

function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
    return key in object;
}

export default arrayIntercept;