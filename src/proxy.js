const proxyUtil  = {
    init: function(){
        //判断是否存在变量
        //如果存在，则直接代理
        const old = window.JSbridge;
        window.JSbridge = {
            ...old,
            call1: function (args){
                return old.call1(args);
            }
        };
    },
};