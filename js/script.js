class First {

    hello(){
      console.log("Привет я метод родителя!");
    }
    
}

const first = new First();


class Second extends First {
    fristHello(){
        first.hello();
        console.log();
        
    }
    hello(){
        first.hello();
        console.log("А я наследуемый метод!");
        
    }
}
const second = new Second();
second.hello();

/*
Напишите расширения метода прототипа:

1) Два класса, First и Second, Second наследует от First .

2) В First есть метод hello - он печатает в консоль "Привет я метод родителя!".

3) Нужно написать в Second метод hello, чтоб он сначала вызывал метод hello из First, а потом сразу печатал в консоль "А я наследуемый метод!"

4) Проверить, чтобы все работало без ошибок в консоли 

5) Запушить задание в репозиторий на github или реализовать на доске CodePen и прикрепить ссылку*/