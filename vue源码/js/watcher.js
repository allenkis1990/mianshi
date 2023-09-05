class Watcher{
    constructor(vm,expr,cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldValue = this.get()
    }
    get(){
        Dep.target = this;
        var value = eval('this.vm.data.'+this.expr);
        Dep.target = null;
        return value;
    }
    update(){
        var nv = eval('this.vm.data.'+this.expr),ov = this.oldValue;
        if(ov!==nv){
            this.cb(nv);
            //这里要手动更新一下oldValue
            this.oldValue = nv
        }
    }
}