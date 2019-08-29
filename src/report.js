import { hasTracert } from './utils';
import { reportImgLinkPrefix } from './const';

const report = function (options = {}){
    // 如果有全局 Tracert ，则走 Tracert 上报
    // 如果没有，则走 image 图片上报的方式
    // 但是数据格式是相同的
    
    if(hasTracert()){
        Tracert.send(options);
        return ;
    }
    const img = new Image();
    options.stamp = +new Date();
    const src = JSON.stringify(options);
    const encodeSrc = encodeURIComponent(src);
    img.src = `${reportImgLinkPrefix}?options=${encodeSrc}`
}

export default report;