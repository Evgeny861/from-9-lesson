'use strict';

let start = document.getElementById('start'),
    data = document.querySelector('.data'),
    buttonPlus = data.getElementsByTagName('button'),
    expensesPlus = buttonPlus[1],
    incomePlus = buttonPlus[0],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    result = document.querySelector('.result'),
    budgetMonthValue = result.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = result.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = result.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = result.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = result.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = result.getElementsByClassName('income_period-value')[0],
    targetMonthValue = result.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    additionalIncomeData1 = document.querySelectorAll('.additional_income-item')[0],
    additionalIncomeData2 = document.querySelectorAll('.additional_income-item')[1],
    expensesItems = document.querySelector('.expenses-items'),
    expensesTitle = expensesItems.querySelector('.expenses-title'),
    expensesItem = document.querySelectorAll('.expenses-items'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    expensesAmountValue = document.querySelector('.expenses-amount');







    let isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
        };
        let isString =  function(n) {
        return isNaN(parseFloat(n)) && n !== "" && n.trim();
        };   
        
    let appData = {
        income: {},
        addIncome: [],
        expenses: {},
        expensesMonth: 0,
        incomeMonth: 0,
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit:0,
        period: 3,
        start: function(){
            if(salaryAmount.value === ''){
                alert('Ошибка, поле "Месячный доход должно быть заполнено!');
                return;
            }
            appData.budget = +salaryAmount.value;
            
            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses(); 
            appData.getAddIncome();
            appData.getBudget();
            appData.showResult();
        },
        showResult: function(){
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(',');
            additionalIncomeValue.value = appData.addIncome.join(',');
            targetMonthValue.value = Math.ceil(appData.getTargetMonth());
            incomePeriodValue.value =  appData.calcSaveMoney();
        },
        addExpensesBlock: function(){        
            let cloneExpensesItem = expensesItem[0].cloneNode(true);            
            expensesItem[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItem = document.querySelectorAll('.expenses-items');            
            if(expensesItem.length === 3){
                expensesPlus.style.display = 'none';
            }
        },
        addIncomeBlock: function(){
            let cloneIncomeItem = incomeItems[0].cloneNode(true);            
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);            
            incomeItems = document.querySelectorAll('.income-items');            
            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }
            
        },
        getExpenses: function(){
            expensesItem.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = +item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }     
                
                
                
            });
        },
        getIncome: function(){
            incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }           
            });
            for(let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
            
            
            
        },
        getAddExpenses: function(){
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== ''){
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function(){
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
        },
            budget: 0,
            budgetDay: 0,
            budgetMonth: 0,
          //  считает сумму обязательных рассходов
        getExpensesMonth:  function() {

                for (let key in appData.expenses) {
                    appData.expensesMonth += +(appData.expenses[key]);
                }
                
            },
        getBudget: function () {
                    appData.budgetMonth = +appData.budget + appData.incomeMonth - +appData.expensesMonth;
                    appData.budgetDay = Math.ceil(+appData.budgetMonth / 30);
                    
                    return  Number(appData.budget) - Number(appData.expensesMonth);
                    
        },
        // Функция подсчитывает за какой период будет достигнута цель
        getTargetMonth: function () {
                        return Number(targetAmount.value) / Number(appData.budgetMonth);
        },
        getStatusIncome: function () {
                        if (appData.budgetDay >= 1200) {
                        return('У вас высокий уровень дохода!');
                        } else if (1200 > appData.budgetDay && appData.budgetDay >= 600) {
                        return('У вас средний уровень дохода!');
                        } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
                        return('К сожалению у вас уровень дохода ниже среднего');
                        } else if (appData.budgetDay <= 0){
                        return('Что то пошло не так'); 
                        }
        },
        getInfoDeposit: function() {
            if(appData.deposit){
                do {
                appData.percentDeposit  = prompt('Какой годовой процент?', 5);
                }
                while (!isNumber(appData.percentDeposit));
                do {
                appData.percentDeposit  = prompt('Какая сумма заложена?', 10000);
                }
                while (!isNumber(appData.percentDeposit));
            }
        },
        calcSaveMoney: function(){
          return appData.budgetMonth * periodSelect.value;
        },
        };
        //console.log(appData.start);
        
        start.addEventListener('click', appData.start);

        incomePlus.addEventListener('click', appData.addIncomeBlock);
        expensesPlus.addEventListener('click', appData.addExpensesBlock);

        // for (let key in appData) {
        //console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
    // }
        // appData.asking();
        // appData.getInfoDeposit();
        //console.log(`Расходы за месяц равны ${appData.getExpensesMonth()}`);
        
        //console.log(`Цель будет достигнута через ${Math.round(appData.getTargetMonth())} месяцев`);
        
        //console.log(appData.getStatusIncome());
        
        for (let symbol of appData.addExpenses) {
        symbol = symbol.charAt(0).toUpperCase() + symbol.substring(1);
        result += symbol + ', ';
        }
        





