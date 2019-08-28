let cachedHasTracertVar;
const hasTracert = function() {
    // 第一次触发时候如果没有 Tracert，那么后续即使 Tracert 有了，也维持原上报方式；
    // 但是注意这个延迟到第一次才判断，而不是初始化时候直接写到环境里。保证尽量能用到 Tracert
    if(cachedHasTracertVar){
        return cachedHasTracertVar;
    }
    return cachedHasTracertVar = !!window.Tracert
};

const getXpath = function(ele) {
    // 逐级上查，找到有 id 属性的就停下
    // 格式：body>div:eq(1):span:eq(2)   [id=id1]>span:eq(0)
    // 逐级向父级查找，推入元素栈内
    // 注意查找的是元素不是节点（比如空白节点，text 节点，不作数）
    // todo: 注意处理有多个拥有同一个 id 的情况，则不作数，接着向上找
    const parentEleStack = [];
    while(ele && ele.tagName.toLocaleLowerCase()!=='html'){
        parentEleStack.push(ele);
        if(ele.id){
            break;
        }
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

    return xpathArr.join('>');
};

export {
    hasTracert,
    getXpath
};