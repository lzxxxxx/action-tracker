import report from '../report';
import { getXpathnSpm } from '../utils';

const cb = function(event){
    // 获取当前点击元素
    const ele = event.target;
    let options = Object.create(null);
    const {xpath, spm}  = getXpathnSpm(ele) || {};
    options.xpath = xpath;
    options.spm = spm;
    report(options);
};

export default cb;