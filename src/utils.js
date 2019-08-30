let cachedHasTracertVar;
const hasTracert = function() {
    // 第一次触发时候如果没有 Tracert，那么后续即使 Tracert 有了，也维持原上报方式；
    // 但是注意这个延迟到第一次才判断，而不是初始化时候直接写到环境里。保证尽量能用到 Tracert
    if(cachedHasTracertVar){
        return cachedHasTracertVar;
    }
    return cachedHasTracertVar = !!window.Tracert
};

const getAttr = function(node, key){
    if(!node || !node.getAttribute){
        return '';
    }
    return node.getAttribute(key);
}

const getXpathnSpm = function(ele) {
    // 逐级上查，当有 id 的父级和 spmc+d 的父级都找到 或者 到 body 了就停下
    // 格式：body>div:eq(1):span:eq(2)   [id=id1]>span:eq(0)
    // 逐级向父级查找，推入元素栈内
    // 注意查找的是元素不是节点（比如空白节点，text 节点，不作数）
    // todo: 注意处理有多个拥有同一个 id 的情况，则不作数，接着向上找
    const parentEleStack = [];
    let spm = {
        c: '',
        d: ''
    };
    while(ele && ele.tagName.toLocaleLowerCase()!=='html'){
        if(parentEleStack._end && spm.c && spm.d){
            break;
        }
        if(!parentEleStack._end){
            parentEleStack.push(ele);
        }
        if(ele.id){
            parentEleStack._end = true;
        }
        spm.c = spm.c || getAttr(ele, 'spm-c') || '';
        spm.d = spm.d || getAttr(ele, 'spm-d') || '';
        ele = ele.parentElement;
    }
    
    const xpathArr = [];
    // 遍历栈，拼接 path 字符串
    for(let i=parentEleStack.length-1; i>=0; i--){
        const ele = parentEleStack[i];
        if(ele.id){
            xpathArr.push(`[id=${ele.id}]`);
            continue;
        }
        const siblings = ele.parentElement.children;
        const tagName = ele.tagName.toLocaleLowerCase();
        let idx = 0;
        for(let i=0; i<siblings.length; i++) {
            const element = siblings[i];
            if(element === ele){
                xpathArr.push(`${tagName}:eq(${idx})`);
                break;
            }
            if(element.tagName.toLocaleLowerCase() === tagName){
                idx++;
            }
        };
    }

    return {
        xpath: xpathArr.join('>'),
        spm
    };
};

const throttle = function (fn, offset=0){
    let last = 0;
    return function(){
        const now = +Date.now();
        if(now - last < offset){
            return ;
        }
        const ctx = this;
        const args = arguments;
        last = now;
        fn.apply(ctx, args);
    }
}


// function throttle(fn, threshhold) {

//     // 记录上次执行的时间
//     var last
  
//     // 定时器
//     var timer
  
//     // 默认间隔为 250ms
//     threshhold || (threshhold = 250)
  
//     // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
//     return function () {
  
//       // 保存函数调用时的上下文和参数，传递给 fn
//       var context = this
//       var args = arguments
  
//       var now = +new Date()
  
//       // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
//       // 执行 fn，并重新计时
//       if (last && now < last + threshhold) {
//         clearTimeout(timer)
  
//         // 保证在当前时间区间结束后，再执行一次 fn
//         timer = setTimeout(function () {
//           last = now
//           fn.apply(context, args)
//         }, threshhold)
  
//       // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
//       } else {
//         last = now
//         fn.apply(context, args)
//       }
//     }
//   }


export {
    hasTracert,
    getXpathnSpm,
    throttle
};