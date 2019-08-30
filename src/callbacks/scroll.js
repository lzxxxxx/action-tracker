import report from '../report';
import { throttle } from '../utils';

const cb = throttle(function(event){
    const options = Object.create(null);
    // 关于纵向滚动距离取值 https://www.cnblogs.com/freshbird/p/3422972.html
    // chrome 下d.body.scrollTop 永远是 0
    // safari 下 d.documentElement.scrollTop 永远是 0
    // 但是这个东西和 doctype 有关，我没再仔细研究
    options.y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    report(options);
}, 200);

export default cb;