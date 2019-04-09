class FuckLiu{
    constructor(options){
        this.vm = this;
        this.data = options.data;
        this.el = options.el;
        if(this.el){
            new Observer(this.data);
            new TemplateCompiler(this.el,this.vm);
        }
    }
}