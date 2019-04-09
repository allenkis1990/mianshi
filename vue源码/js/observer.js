class Observer{
    constructor(data){
        this.data = data;
        this.observe(data);
    }
    observe(data){
        //如果data不是对象就什么事都不干
        if(!data || Object.prototype.toString.call(data)!=='[object Object]'){
            return false;
        }
        Object.keys(data).forEach((key)=>{
            this.defineProperty(data,key,data[key]);
        })
    }
    defineProperty(obj,key,value){
        //这是一个数组装着同一个model但是可能属于不同的node
        var dep = new Dep();
        // console.log(dep);
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:false,
            get(){
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set(nv){
                value = nv;
                dep.notify();
            }
        })
    }
}

class Dep{
    constructor(){
        this.subs = [];
    }
    addSub(sub){
        this.subs.push(sub);
    }
    notify(){
        this.subs.forEach((sub)=>{
            sub.update();
        })
    }
}