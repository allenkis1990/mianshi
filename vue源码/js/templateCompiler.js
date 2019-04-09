class TemplateCompiler{
    constructor(el,vm){
        this.vm = vm;
        this.el = this.isElementType(el)?el:document.querySelector(el);
        if(this.el){
            this.compile(this.el,vm)
        }
    }
    compile(node){
        var fragment = this.appChildIntoFragment(node);
        var childNodes = fragment.childNodes;
        this.eachChildNodes(childNodes);
        node.appendChild(fragment)
    }

    //解析元素v-text v-model
    compileElement(node){
        var attrs = Array.from(node.attributes);
        attrs.forEach((attr)=>{
            if(attr.name.indexOf('v-')>=0){
                var type = attr.name.replace('v-','');
                var expr = attr.value;
                updaterUtils[type]&&updaterUtils[type](node,this.vm,expr);
            }
        })
    }
    //解析{{xxx}}
    compileText(node){
        var reg = /\{\{(.+?)\}\}/ig
        var matchs= node.textContent.match(reg);
        if(matchs){
            //去除前后空格后的表达式
            matchs.forEach((match)=>{
                var expr = match.replace('{{','').replace('}}','').replace(/^\s+/,'').replace(/\s+$/,'')
                updaterUtils['text']&&updaterUtils['text'](node,this.vm,expr,match);
            })
        }
    }

    //递归解析
    eachChildNodes(childNodes){
        Array.from(childNodes).forEach((childNode)=>{
            // console.log(childNode);
            if(this.isElementType(childNode)){
                this.compileElement(childNode);
            } else {
                this.compileText(childNode);
            }
            if(childNode.childNodes.length){
                this.eachChildNodes(childNode.childNodes);
            }
        })
    }

    /**
     *把el上的节点全部移到内存里去并返回fragment
     */
    appChildIntoFragment(node){
        var fragment = document.createDocumentFragment(),
            firstChild;
        while(firstChild=node.firstChild){
            fragment.appendChild(firstChild)
        }
        return fragment;
    }
    isElementType(node){
        return node.nodeType === 1;
    }
    isTextType(node){
        return node.nodeType === 3;
    }
}
var updaterUtils = {
    //解析v-text
    text(node,vm,expr,match){
        if(match){
            node.textContent = node.textContent.replace(match,vm.data[expr])
            new Watcher(vm,expr,(nv)=>{
                // console.log(3333,'{{}}');
                node.textContent = nv;
            })
        }else{
            node.innerText = vm.data[expr];
            new Watcher(vm,expr,(nv)=>{
                // console.log(3333,'text');
                node.innerText = nv;
            })
        }
    },
    //解析v-model
    model(node,vm,expr){
        node.value = vm.data[expr];
        new Watcher(vm,expr,(nv)=>{
            // console.log(3333,'model');
            node.value = nv;
        })
        node.addEventListener('input',(e)=>{
            vm.data[expr] = e.target.value;
        })
    }
}