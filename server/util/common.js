var common = {
    //继承
    extend: function(src, des){
        for(var tmp in src){
            if(src.hasOwnProperty(tmp)){
                des[tmp] = src[tmp];
            }
        }
        return des;
    }
};

module.exports  = common;