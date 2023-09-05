class TemplateCompiler{
    constructor(el,vm){
        this.vm = vm;
        this.el = this.isElementType(el)?el:document.querySelector(el);
        if(this.el){
            this.compile(this.el,vm)
        }
    }
    compile(node){
        //观察放入fragment前的node
        var fragment = this.appChildIntoFragment(node);
        var childNodes = fragment.childNodes;
        //观察放入fragment后的node
        console.log(childNodes,'childNodes');
        //处理fragment下的元素
        this.eachChildNodes(childNodes);
        //把处理后的元素放回到#app
        node.appendChild(fragment)
    }

    //解析元素v-text v-model
    compileElement(node){
        var attrs = Array.from(node.attributes);
        debugger
        attrs.forEach((attr)=>{
            if(attr.name.indexOf('v-')>=0){
                var type = attr.name.replace('v-','');
                var expr = attr.value;
                console.log(expr,'expr');
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
                console.log(expr,'expr2');
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
            console.log(firstChild,'firstChild');
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
        var exprData = eval('vm.data.'+expr)
        // console.log(exprData,
        // 222);
        //这里只处理了只要是typeof对象就JSON.stringify否则不变
        exprData = !(typeof exprData==='object'&&exprData!==null)?exprData:JSON.stringify(exprData)
        if(match){
            //解析{{}}双括号
            node.textContent = node.textContent.replace(match,exprData)


            new Watcher(vm,expr,(nv)=>{
                // console.log(3333,'{{}}');
                node.textContent = nv;
            })
        }else{
            //解析v-text
            node.textContent = exprData;


            new Watcher(vm,expr,(nv)=>{
                // console.log(3333,'text');
                node.innerText = nv;
            })
        }
    },
    //解析v-model
    model(node,vm,expr){
        node.value = eval('vm.data.'+expr);
        new Watcher(vm,expr,(nv)=>{
            // console.log(3333,'model');
            node.value = nv;
        })
        node.addEventListener('input',(e)=>{
            eval('vm.data.'+expr+'="'+e.target.value+'"');
            // console.log('vm.data.' + expr + '="' + e.target.value + '"');
            // vm.data[expr] = e.target.value;
        })
    }
}