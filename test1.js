var x = 3,
    obj = {x:5}
    obj.fn = (function(){
        this.x *= ++x
        return function(y){
            this.x*=(++x)+y
            console.log(x);
        }
    })()

var fn = obj.fn //x=4
obj.fn(6)//x=5  obj.x = 55  x=6
fn(4) //x=7  x=77
console.log(obj.x, x);//55 77



