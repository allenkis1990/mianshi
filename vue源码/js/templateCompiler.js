class TemplateCompiler{
    constructor(el,vm){
        this.el = this.isElementType(el)?el:document.querySelector(el);
        if(this.el){
            this.compile(this.el,vm)
        }
    }
    compile(node,vm){
        var fragment = this.appChildIntoFragment(node);
        var childNodes = fragment.childNodes;
        this.eachChildNodes(vm,childNodes);
        node.appendChild(fragment)
    }

    eachChildNodes(vm,childNodes){
        Array.from(childNodes).forEach((childNode)=>{
            // console.log(childNode);
            if(this.isElementType(childNode)){
                // console.log('元素类型');
                var attrs = Array.from(childNode.attributes);
                attrs.forEach((attr)=>{
                    if(attr.name.indexOf('v-')>=0){
                        var type = attr.name.replace('v-','');
                        var expr = attr.value;
                        updaterUtils[type]&&updaterUtils[type](childNode,vm,expr);
                    }
                })
            } else {
                var reg = /\{\{(.+?)\}\}/ig
                var matchs= childNode.textContent.match(reg);
                if(matchs){
                    //console.log(matchs);
                    //去除前后空格后的表达式
                    matchs.forEach((match)=>{
                        var expr = match.replace('{{','').replace('}}','').replace(/^\s+/,'').replace(/\s+$/,'')
                        //console.log(match);
                        updaterUtils['text']&&updaterUtils['text'](childNode,vm,expr,match);
                    })
                }
            }
            if(childNode.childNodes.length){
                this.eachChildNodes(vm,childNode.childNodes);
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
        }else{
            node.innerText = vm.data[expr];
        }
    },
    //解析v-model
    model(node,vm,expr){
        node.value = vm.data[expr];
    }
}