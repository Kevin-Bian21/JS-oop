function extend(Child, Parent) {
    //new Circle.prototype.constructor(1)  =>  new Circle(1);
    //当重设了原型属性，则应该确保重设构造器
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}


function Shape(color) {
    this.color = color;
}

Shape.prototype.duplicate = function() {
    console.log('duplicate');
}


function Circle(radius, color) {
    Shape.call(this, color)  //调用父类构造器

    this.radius = radius;
}
extend(Circle, Shape);

Circle.prototype.draw = function() {
    console.log('draw');
}



function Square(size) {
    this.size = size;
}
extend(Square, Shape);



const s = new Shape();
const c = new Circle(1, 'red');
c.duplicate();

new Square.prototype.constructor(1).duplicate();



// Method Overriding
Circle.prototype.duplicate = function() {
    //如果想调用父类的该方法，可以直接在此调用
    //Shape.prototype.duplicate.call(this);

    console.log("duplicate circle");
}
c.duplicate();




function Triangle() {

}
extend(Triangle, Shape);
Triangle.prototype.duplicate = function() {
    console.log('duplicate triangle');
}



// prototypes 多态
const shapes = [
    new Triangle(),
    new Circle(),
];

for (let shape of shapes)
    shape.duplicate();



// 好的组合胜过继承
function mixin(target, ...value) {
    Object.assign(target.prototype, ...value);
}
const canEat = {
    eat : function() {
        this.hungry --;
        console.log('eating');
    }
}

const canWalk = {
    walk : function() {
        console.log('walking');
    }
}

const canSwim = {
    swam : function() {
        console.log('swaming');
    }
}

function Person() {
}

function GoldFish() {
}

mixin(Person, canEat, canSwim, canWalk);
mixin(GoldFish, canEat, canSwim);


const person = Object.assign({}, canEat, canSwim, canWalk);
console.log(person);

const p = new Person();
console.log(p);

const f = new GoldFish();
console.log(f);





// Exercise
function HtmlElement() {
    this.click = function() {
        console.log('click');
    }
}

HtmlElement.prototype.focus = function() {
    console.log('focus');
}

function HtmlSelectElement(items = [1,2,3]) {
    this.items = items;
    this.addItem = function(item) {
        this.items.push(item);
    }
    this.removeItem = function(item) {
        this.items.splice(this.items.indexOf(item),1);
    }

    this.rander = function() {
        return `
<select>${this.items.map(item => `
    <option>${item}</option>`).join('')}
</select>`;
    }
}

HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

const h = new HtmlSelectElement();
console.log(h);


function HtmlImageElement(src) {
    this.src = src;
    this.rander = function() {
        return `<img src = "${this.src}" />`;
    }
}

HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;

const img = new HtmlImageElement();
console.log(h.rander());