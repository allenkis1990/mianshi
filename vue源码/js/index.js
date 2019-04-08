class LwhVue{
    constructor(options){
        this.vm = this;
        this.data = options.data;
        this.el = options.el;
        if(this.el){
            new TemplateCompiler(this.el,this.vm);
        }
    }
}