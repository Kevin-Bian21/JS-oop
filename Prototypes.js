//除根对象外都有原型

let person = {
    name : 'Kevin'
};

Object.defineProperty(person, 'name', {
    writable : true,   //可以重写该方法，可以重设它的值
    enumerable : true,   //遍历person对象时可以看到name属性
    configurable : false  //不能删除name属性
});

//获得对象原型的方法
Object.getPrototypeOf(person);

// person.__proto__

let array = [];
Array.prototype  === array.__proto__;   // true




function Circle(radius) {
    this.radius = radius;

    this.move = function() {
        console.log('draw');
    }
}

//原型对象成员 draw
Circle.prototype.draw = function() {
    console.log("draw!");
}

const c1 = new Circle(1);
const c2 = new Circle(1);

c1.draw();

//重写Circle原型的toString方法
Circle.prototype.toString = function() {
    return "Circle's radius " + this.radius;
}


// returns instance members
console.log(Object.keys(c1));    // ['radius', 'move']

// return all members (instance + prototype)
for (let key in c1)
    console.log(key);      // ['radius', 'move', 'draw', 'toString']



//练习
function StopWatch() {
    let startTime, endTime, running, duration = 0;

    Object.defineProperty(StopWatch, 'startTime', {
        get : function() {
            return startTime;
        }
    });
    Object.defineProperty(StopWatch, 'endTime', {
        get : function() {
            return endTime;
        }
    });
    Object.defineProperty(StopWatch, 'running', {
        get : function() {
            return running;
        }
    });    Object.defineProperty(StopWatch, 'duration', {
        get : function() {
            return duration;
        }
    });
}

StopWatch.prototype.start = function() {
    if (this.running) 
        throw new Error("StopWatch has alreay started");
    this.running = true;
    this.startTime = new Date();
}

StopWatch.prototype.stop = function() {
    if(!this.running) 
        throw new Error('StopWatch has already stoped')
    this.running = false;
    this.endTime = new Date();
    const seconds = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    this.duration = seconds;
}

StopWatch.prototype.reset = function() {
    this.startTime = 0;
    this.endTime = 0;
    this.running = false;
    this.duration = 0;
}
const sw = new StopWatch();
