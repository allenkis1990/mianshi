/**
 * vue双向绑定流程：
 * 1.给this.data对象的每一个key添加观察者(Object.defineProperty)
 * 2.解析this.el这个dom,把里面的所有元素加到fragment里面去，处理完再重新放回页面去
 * 3.找到this.el下的每个子节点进行解析，解析元素节点的attr(v-model,v-text)，解析文本节点的{{}}
 * 4.在解析模板的时候添加watcher，watcher会存下vm expr还有改变当前节点的fn  (node.textContent=nv)
 * 5.watcher里会拿一次this.data[expr]，这次会触发data的defineProperty的get方法，watcher的get方法会把自己的this
 *   存在Dep的target上，等到data的defineProperty的get触发就push到一个数组里去（subs数组），watcher里有个update方法会调用改变
 *   节点内容的cb
 * 6.当vm.data.a 被设值的时候会调用subs数组里所有watcher的update方法来改变节点的值
 * 7.代理，把vm.data上所有的属性都代理到vm的属性上
 */

class FuckLiu{
    constructor(options){
        this.vm = this;
        this.data = options.data;
        this.el = options.el;
        this.computed = options.computed
        if(this.el){
            //增加观察者
            new Observer(this.data);

            //把vm.data.a代理到vm.a上
            this.proxy()

            this.bindComputedToData()

            //解析模板
            new TemplateCompiler(this.el,this.vm);

        }
    }
    proxy(){
        var _this = this
        for(let key in this.data){
            Object.defineProperty(_this.vm,key,{
                get(){
                    return _this.data[key]
                },
                set(nv){
                    this.data[key] = nv
                }
            })
        }
    }

    //把computed代理到vm.data上去
    bindComputedToData(){
        var _this = this
        for(let key in this.computed){
            Object.defineProperty(_this.data,key,{
                get(){
                    var fn = _this.computed[key]
                    return fn.call(_this)
                }
            })
        }
    }
}