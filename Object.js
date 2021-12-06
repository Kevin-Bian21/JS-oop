console.log('Hello World');

// Factory Function
function createCircle(radius) {
    return {
        radius,
        draw : function() {
            console.log("draw");
        }
    }
}
const circle = createCircle(1);


// Constractor Function
function Circle(radius) {
    this.radius = radius;

    //如果不需要在外面访问内部的属性的话，就不需要将属性设置为成员变量，这样从面向对象角度来看这些属性相当于私有，外部无法访问
    let color = 'red';

    this.draw = function() {
        color = 'blue';
        console.log('draw');
    }

    Object.defineProperty(this, 'color', {
        get : function() {
            return color;
        },
        set : function(value) {
            color = value;
        }
    });
}
const another = new Circle(1);

/*
> circle.constructor
< ƒ Object() { [native code] }


> another.constructor
< ƒ Circle(radius) {
    this.radius = radius;
    this.draw = function() {
        console.log('draw');
    }
}
*/
//js 是动态语言，可以在编写好的对象之后添加或者删除属性
another['loaction'] = {x : 1};

delete another.loaction;


another.color = 'green';
console.log(another.color);