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
                    console.log(matchs);
                    //去除前后空格后的表达式
                    matchs.forEach((match)=>{
                        var expr = match.replace(/^\s+/,'').replace(/\s+$/,'')
                        match = match.replace(/\{/ig,'\\{')
                        match = match.replace(/\}/ig,'\\}')
                        console.log(match);
                        updaterUtils['text']&&updaterUtils['text'](childNode,vm,expr,new RegExp(match));
                    })
                }
            }
        })
        node.appendChild(fragment)
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
    text(node,vm,expr,reg){
        if(reg){
            node.textContent = node.textContent.replace(reg,vm.data[expr])
        }else{
            node.innerText = vm.data[expr];
        }
    },
    //解析v-model
    model(node,vm,expr){
        node.value = vm.data[expr];
    }
}