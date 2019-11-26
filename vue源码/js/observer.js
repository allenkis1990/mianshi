class Observer{
    constructor(data){
        this.data = data;
        this.observe(data);
    }
    observe(data){
        //如果data不是对象就什么事都不干
        if (!data || !this.isRealObject(data)) {
            return false;
        }

        Object.keys(data).forEach((key)=>{
            this.defineProperty(data,key,data[key]);
            //如果对象里面还是对象就要递归
            if(this.isRealObject(data[key])){
                this.observe(data[key])
            }
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
                //Dep.target只会在解析模板的时候（text {{}}）存在又立即被清空 所以addSub只会执行一次就是在模板解析的时候
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set(nv){
                value = nv;
                dep.notify();
            }
        })
    }
    //是否是对象
    isRealObject(obj){
        return Object.prototype.toString.call(obj)==='[object Object]';
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