// 'use strict'


// 以这种情况定义，在默认情况下，类体以严格模式解析执行
class Circle {
    constructor(radius) {
        this.radius = radius;
        this.move = function() {
            console.log('move',this);
        }
    }

    // Instance Method
    draw() {
        console.log('draw',this);
    }

    //Static Method
    static parse(str) {
        const radius = JSON.parse(str).radius;
        return new Circle(radius);
    }
}

const c = Circle.parse('{"radius" : 10}');

const circle = new Circle(1);

//Method Call
circle.draw();


const draw = circle.draw;
// Function Call
draw();   // undefined



// Private 实现属性和方法的私有
let _length = Symbol();
let _draw  = Symbol();
class Rectangle {
    constructor(length) {
        this[_length] = length;
    }

    [_draw] () {
        console.log('draw rectangle');
    }
}

const rectangle = new Rectangle(2);
console.log(Object.getOwnPropertyNames(rectangle));
console.log(Object.getOwnPropertySymbols(rectangle));


// 使用WeakMap实现成员变量和方法的私有
const _width = new WeakMap();
const _move = new WeakMap();

class Square {
    constructor(width) {
        _width.set(this, width);

        _move.set(this, () => console.log('move', this) );   // 使用箭头函数可以将this继承，即this —> Square对象
    }

    draw() {
        _move.get(this)();

        console.log(_width.get(this));
    }

    // Getter and Setter
    get width() {
        return _width.get(this);
    }

    set width(value) {
        if (value <= 0)
            throw new Error('Invalid width');
        _width.set(this, value);
    }

}

const s = new Square(2);
_move.get(s)();   // move Square {}




// 另一种方法
const privateProps = new WeakMap();
/*
class Square {
    constructor(width) {
       privateProps.set(this, {
           width : width,
           move : () => console.log('move', this)
       });

       // 调用
       privateProps.get(this).width;
       privateProps.get(this).move();
    }

}
*/



class Shape {
    constructor(color) {
        this.color = color;
    }

    move() {
        console.log('move');
    }
}

class Triangle extends Shape {
    constructor(color,length) {
        super(color);
        this.length = length;
    }

    draw() {
        console.log('draw');
    }

    // Overriding
    move() {
        console.log('triangle move');
    }
}

const t = new Triangle('red',3);
t.move();




// Exercise

const _array = new WeakMap();

class Stack {
    constructor() {
        _array.set(this, []);
    }

    push(value) {
        _array.get(this).push(value);
    }

    pop() {
        if (_array.get(this).length <= 0)
            throw new Error('the stack is empty');
        return _array.get(this).pop();
    }

    peek() {
        if (_array.get(this).length <= 0)
            throw new Error('the stack is empty');
        return _array.get(this)[_array.get(this).length - 1];
    }

    get count() {
        return _array.get(this).length;
    }
}

const stack = new Stack();