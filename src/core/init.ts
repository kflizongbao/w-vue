
/*

*/
import { initLifecycle }  from './lifecycle';
import { initState }  from './state';
import { initEvents }  from './events';
import { initRender }  from './render';

export class initMixins {
    [x: string]: any;

    _init() {
        const options = {};
        initLifecycle(this, options);
        initState(this, options);
        initEvents(this, options);
        initRender(this, options);

        this.$mount();
    }

    
}