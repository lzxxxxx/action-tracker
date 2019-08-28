import report from '../report';
import { getXpath } from '../utils';

const cb = function(event){
    // 获取当前点击元素
    const ele = event.target;
    let options = Object.create(null);
    options.xpath = getXpath(ele);
    report(options);
};

export default cb;