UE.registerUI('fillblank', function(editor, uiname){
    let iconUrl = editor.options.UEDITOR_HOME_URL + 'plugin/fillblank/icon.png';
    let tmpLink = document.createElement('a');
    tmpLink.href = iconUrl;
    tmpLink.href = tmpLink.href;
    iconUrl = tmpLink.href;
    
    let btn = new UE.ui.Button({
        name:'插入' + uiname,
        title:'插入填空-' + uiname,
        //需要添加的额外样式，指定icon图标
        cssRules :'background-image: url("' + iconUrl + '") !important; background-size:20px;',
        onclick: function () {
            let fillblanks = editor.body.getElementsByClassName('fill-blank');
            /*let html = [
                '<span class="fill-blank" contenteditable="true" spellcheck="false" ',
                ' style="display:inline-block; min-width:6.5em; line-height:1.2; font-size:0.8em; text-align:center; padding:0 .5em; border:0; border-bottom: 1px solid #000;">',
                '<em class="fill-blank-init-tip" style="color:#999;">填空('+ (fillblanks.length+1) +')</em>',
                '</span>&#8203;'
            ];*/
            let id = "fill-blank-" + Math.round(Math.random() * 100000000);
            let html = [
                '<span data_key="'+ id +'" class="fill-blank" contenteditable="true" spellcheck="false" title="按空格键调整宽度" ',
                ' style="display:inline-block; line-height:1.2; text-align:center; padding:0 1.5em; border:0; border-bottom: 1px solid #000; color:#E6A23C;">',
                '&#8203;<span contenteditable="false">'+ ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩'][fillblanks.length] +'</span>&#8203;',
                '</span>&#8203;'
            ];
            editor.execCommand('inserthtml', html.join(''), true);
        }
    });

    //当点到编辑内容上时，按钮要做的状态反射
    let len = 0;
    editor.addListener('contentChange', function () {
        let fillblanks = editor.body.getElementsByClassName('fill-blank');
        if(len !== fillblanks.length) {
            for(let i=0; i<fillblanks.length; i++){
                let itemEL = fillblanks[i];
                let html = itemEL.innerHTML;
                itemEL.innerHTML = html.replace(/<span.*>.{1}<\/span>/gi, '<span contenteditable="false">'+ ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩'][i] +'</span>');
            }
            len = fillblanks.length;
            editor.fireEvent('contentChange');
        }
    });

    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function () {
        let state = editor.queryCommandState(uiname);
        //判断是否在fillblank元素内部
        let range = editor.selection.getRange();
        let target = range.startContainer;
        target = UE.dom.domUtils.findParent(target, (node) => {
            if(UE.dom.domUtils.hasClass(node, 'fill-blank')){
                return true;
            }
        }, true);
        if(target) {
            state = -1;
        }
        //判断是否超出个数限制
        let fillblanks = editor.body.getElementsByClassName('fill-blank');
        if(fillblanks.length > 9){
            state = -1;
        }
        if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });

    //当点到输入框
    editor.addListener('click', function(type, e) {
        let target = e.target;
        if(target){
            if(target.tagName == 'SPAN' && UE.dom.domUtils.hasClass(target, 'fill-blank')){
                let range = editor.selection.getRange();
                let inittip = target.getElementsByClassName('fill-blank-init-tip');
                if(inittip.length > 0){
                    target.innerHTML = '&nbsp;';
                }
                //let node = range.selectNodeContents(target);
                //node.setCursor(true);
                editor.fireEvent('selectionchange');
            }
            if(target.tagName == 'EM' && UE.dom.domUtils.hasClass(target, 'fill-blank-init-tip')){
                let parent = target.parentNode;
                parent.removeChild(target);
                //parent.innerHTML = '&#8203;';
                parent.innerHTML = '&nbsp;';
                editor.fireEvent('contentChange');
                let range = editor.selection.getRange();
                let node = range.selectNodeContents(parent);
                node.setCursor(true);
            }
        }
    });

    return btn;
});

