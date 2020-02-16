function fn(maxLength){
    return function add(...args){
        if(args.length>=maxLength){
            console.log('最后一次调用为===》', args);
            return args
        }
        let len = maxLength-args.length
        return fn(len)
    }
}
let add = fn(5)
let res = add(1,2,3)
console.log(res);