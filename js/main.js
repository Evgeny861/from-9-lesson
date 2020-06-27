'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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
    incomeItem = document.querySelector('.income-items'),
    incomeTitle = document.querySelectorAll('.income-title')[1],
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
    expensesAmountValue = document.querySelector('.expenses-amount'),   
    depositCheckmark = document.querySelector('.deposit-checkmark'),
    depositCheckmarkClone = depositCheckmark.cloneNode(),
    depositLabel = document.querySelector('.deposit-label');
    

    let isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
        };
        let isString =  function(n) {
        return isNaN(parseFloat(n)) && n !== "" && n.trim();
        };   
        
    let appData = {
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
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
            
            
            
            
            this.budget = +salaryAmount.value;
            this.checkSalaryAmount();
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses(); 
            this.getAddIncome();
            this.getBudget();
            this.showResult();
            this.buttonStartBlock();
        },
        finish: function(){
            
            this.budget = +salaryAmount.value;
            this.checkSalaryAmount();
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses(); 
            this.getAddIncome();
            this.getBudget();
            this.showResult();

        },
        blockingInput: function(){
            budgetMonthValue.value = 0;
            budgetDayValue.value = 0;
            expensesMonthValue.value = 0;
            additionalExpensesValue.value = 0;
            additionalIncomeValue.value = 0;
            targetMonthValue.value = 0;
            incomePeriodValue.value =  0;
        },
        showResult: function(){
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(',');
            additionalIncomeValue.value = this.addIncome.join(',');
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            incomePeriodValue.value =  this.calcSaveMoney();
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
                    this.expenses[itemExpenses] = cashExpenses;
                }   
                
                
            }, appData);
        },
        getIncome: function(){
            incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }        
            
            }, appData);
            for(let key in this.income){
                this.incomeMonth += +this.income[key];
            }
        },
        getAddExpenses: function(){
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== ''){
                    this.addExpenses.push(item);
                } 
                
            }, appData);
        },
        getAddIncome: function(){
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    this.addIncome.push(itemValue);
                } 
                
            }, appData);
        },
          //  считает сумму обязательных рассходов
        getExpensesMonth:  function() {
                for (let key in this.expenses) {
                    this.expensesMonth += +(this.expenses[key]);
                }
                
            },
        getBudget: function () {
                    appData.budgetMonth = +this.budget + this.incomeMonth - +this.expensesMonth;
                    appData.budgetDay = Math.ceil(+this.budgetMonth / 30);
                    
                    return  Number(this.budget) - Number(this.expensesMonth);
                    
        },
        // Функция подсчитывает за какой период будет достигнута цель
        getTargetMonth: function () {
                        return Number(targetAmount.value) / Number(this.budgetMonth);
        },
        getStatusIncome: function () {
                        if (this.budgetDay >= 1200) {
                        return('У вас высокий уровень дохода!');
                        } else if (1200 > this.budgetDay && this.budgetDay >= 600) {
                        return('У вас средний уровень дохода!');
                        } else if (this.budgetDay < 600 && this.budgetDay > 0) {
                        return('К сожалению у вас уровень дохода ниже среднего');
                        } else if (this.budgetDay <= 0){
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
          return this.budgetMonth * periodSelect.value;
        },
        getCounterPeriod: function(){
                let periodAmount = document.querySelector('.period-amount');
                periodAmount.textContent = periodSelect.value;
                appData.showResult();
            
        },
        checkSalaryAmount: function(){
            if(salaryAmount.value === ''){
                start.setAttribute("disabled", "disabled");
            }else {
                start.removeAttribute("disabled");
            }
        },
        buttonStartBlock: function(){
            salaryAmount.setAttribute("readonly", "readonly");
            incomeAmount.setAttribute("readonly", "readonly");
            incomeTitle.setAttribute("readonly", "readonly");
            additionalIncomeData1.setAttribute("readonly", "readonly");
            additionalIncomeData2.setAttribute("readonly", "readonly");
            expensesAmountValue.setAttribute("readonly", "readonly");
            expensesTitle.setAttribute("readonly", "readonly");
            additionalExpensesItem.setAttribute("readonly", "readonly");
            targetAmount.setAttribute("readonly", "readonly");
            start.style.display = 'none';
            cancel.style.display = 'block';
        }, 
        cancelRemoveData: function(){          
            expensesItem.forEach(function(item){
                // let expensesItems = document.querySelectorAll('.expenses-items');
                if(expensesItem.length > 1){
                    item.remove();
                    expensesItem = document.querySelectorAll('.expenses-items');
                    document.querySelector('.expenses-amount').value = '';
                    document.querySelectorAll('.expenses-title')[1].value = '';
                    expensesPlus.style.display = 'block';
                }
            }, appData);
            incomeItems.forEach(function(item){
                // let incomeItems = document.querySelectorAll('.income-items');
                if(incomeItems.length > 1){
                    item.remove();
                    incomeItems = document.querySelectorAll('.income-items');
                    document.querySelectorAll('.income-title')[1].value = '';
                    document.querySelector('.income-amount').value = '';
                    incomePlus.style.display = 'block';
                    
                }
            }, appData);
            
            salaryAmount.value = "";
            incomeAmount.value = "";
            incomeTitle.value = "";
            additionalIncomeData1.value = "";
            additionalIncomeData2.value = "";
            expensesAmountValue.value = "";
            expensesTitle.value = "";
            additionalExpensesItem.value = "";
            targetAmount.value = "";
            salaryAmount.removeAttribute("readonly", "readonly");
            incomeAmount.removeAttribute("readonly", "readonly");
            incomeTitle.removeAttribute("readonly", "readonly");
            additionalIncomeData1.removeAttribute("readonly", "readonly");
            additionalIncomeData2.removeAttribute("readonly", "readonly");
            expensesAmountValue.removeAttribute("readonly", "readonly");
            expensesTitle.removeAttribute("readonly", "readonly");
            additionalExpensesItem.removeAttribute("readonly", "readonly");
            targetAmount.removeAttribute("readonly", "readonly");
                this.budget = 0;
                this.budgetDay = 0;
                this.budgetincome = 0;
                this.budgetMonth = 0;
                this.incomeMonth = 0;
                this.expensesMonth = 0;
                this.deposit = false;
                this.percentDeposit = 0;
                this.moneyDeposit = 0;
                this.income = {};
                this.addIncome = [];
                this.expenses = {};
                this.addExpenses = [];
                start.style.display = 'block';
                cancel.style.display = 'none';
                appData.showResult();
                targetMonthValue.value = "";
                
        }

        
        };
        start.addEventListener('click', appData.start.bind(appData));
        cancel.addEventListener('click', appData.cancelRemoveData.bind(appData));
        periodSelect.addEventListener('input', appData.getCounterPeriod);
        salaryAmount.addEventListener('input', appData.checkSalaryAmount);
        
        

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