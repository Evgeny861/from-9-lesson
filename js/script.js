function hello(){
    console.log('Hello', this);
    
}

const persone = {
    name: 'Evgeny', 
    age: 21, 
    sayHello: hello,
    sayHelloWindow: hello.bind(window),
    logInfo: function(){
        console.group(this.name )
        console.log(`Name is ${this.name}`);
        console.log(`Age is ${this.age}`);
    }
};

const Tanya = {
    name: 'Tatyana',
    age:23,    
};
persone.logInfo.bind(Tanya)();