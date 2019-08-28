import { eventType } from './const';
import clickCb from './callbacks/click';

/** 
 * 初始化（采样率控制，sdk 版本号控制，调用队列缓存）
 */

/**
 * 采集 sdk
 * 包括事件监听（兼容性和性能）
 * 埋点上报（分端内和端外）如果没有 tracert 则图片形式上报
 * 敏感数据回避上报
 */

/**
 * 以点击事件为例：
 * 全局监听点击事件，递归寻找 spm 埋点，处理 xpath；注意处理连续点击和 fastclick 之类
 * 实时上报
 * 我们本质是希望，移动端双击也可以上报，所以我们只监听 touchend，不再监听 click，在回放的时候可以触发 click 来处理
 * 而 fastclick 引入之后，只触发 touchend 事件，然后fastclick手动调用 click， 我们监听 touchend 没毛病。
 * 但是这里应该要处理 mousemove 的情况，如果 move 了则不上报 touchend？
 */

/**
 * 全局都要注意错误的拦截，不能影响原有业务逻辑
 */



function init() {
    const d = window.document;
    // const types = eventType.values();
    // for(let type of types){
        // var clickCb = function(){alert(1);};
        // eval(`const ${type}_cb = `);

        d.addEventListener(eventType.get('CLICK'), clickCb);

        // 记录毫秒数
        // const timeDom = document.querySelector('.time');
        // // let timestamp = null;
        // d.addEventListener('click',()=>{
        //     // timeDom.innerHTML = 'touchend';// 清空之前的展示
        //     timeDom.append('click\n');
        //     // 消除 touch move 的影响
        // },false);
        // d.addEventListener('resize', ()=>{
        //     console.log('===resize');
        // });

    // }
}
init();