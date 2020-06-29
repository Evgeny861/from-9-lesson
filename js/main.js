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
        
        const AppData = function(){
            this.budget =  0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.income = {};
            this.addIncome = [];
            this.expenses = {};
            this.expensesMonth = 0;
            this.incomeMonth = 0;
            this.addExpenses = [];
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit =0;
            this.period = 0;
        };

        AppData.prototype.start = function(){
            console.log(this);
            
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
        };

        AppData.prototype.finish = function(){
        
            this.budget = +salaryAmount.value;
            this.checkSalaryAmount();
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses(); 
            this.getAddIncome();
            this.getBudget();
            this.showResult();
        };

        AppData.prototype.blockingInput = function(){
            budgetMonthValue.value = 0;
            budgetDayValue.value = 0;
            expensesMonthValue.value = 0;
            additionalExpensesValue.value = 0;
            additionalIncomeValue.value = 0;
            targetMonthValue.value = 0;
            incomePeriodValue.value =  0;
        };

        AppData.prototype.showResult = function(){
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses;
            additionalIncomeValue.value = this.addIncome;
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            incomePeriodValue.value =  this.calcSaveMoney();
        };

        AppData.prototype.addExpensesBlock = function(){        
            let cloneExpensesItem = expensesItem[0].cloneNode(true);            
            expensesItem[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItem = document.querySelectorAll('.expenses-items');            
            if(expensesItem.length === 3){
                expensesPlus.style.display = 'none';
            }
        };

        AppData.prototype.addIncomeBlock = function(){
            let cloneIncomeItem = incomeItems[0].cloneNode(true);            
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);            
            incomeItems = document.querySelectorAll('.income-items');            
            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }
            
        };

        AppData.prototype.getExpenses = function(){
            const _this = this;
            expensesItem.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = +item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    this.expenses[itemExpenses] = cashExpenses;
                }   
                
                
            }, _this);
        };

        AppData.prototype.getIncome = function(){
            const _this = this;
            incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }        
            
            }, _this);
            for(let key in this.income){
                this.incomeMonth += +this.income[key];
            }
        };

        AppData.prototype.getAddExpenses = function(){
            const _this = this;
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== ''){
                    this.addExpenses.push(item);
                } 
                
            }, _this);
        };

        AppData.prototype.getAddIncome = function(){
            const _this = this;
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if(itemValue !== ''){
                    this.addIncome.push(itemValue);
                } 
                
            }, _this);
        };

          //  считает сумму обязательных рассходов
        AppData.prototype.getExpensesMonth =  function() {
                for (let key in this.expenses) {
                    this.expensesMonth += +(this.expenses[key]);
                }
                
        };

        AppData.prototype.getBudget = function () {
                    this.budgetMonth = +this.budget + this.incomeMonth - +this.expensesMonth;
                    this.budgetDay = Math.ceil(+this.budgetMonth / 30);
                    
                    return  Number(this.budget) - Number(this.expensesMonth);
                    
        };

        // Функция подсчитывает за какой период будет достигнута цель
        AppData.prototype.getTargetMonth = function () {
                        return Number(targetAmount.value) / Number(this.budgetMonth);
        };

        AppData.prototype.getStatusIncome = function () {
                        if (this.budgetDay >= 1200) {
                        return('У вас высокий уровень дохода!');
                        } else if (1200 > this.budgetDay && this.budgetDay >= 600) {
                        return('У вас средний уровень дохода!');
                        } else if (this.budgetDay < 600 && this.budgetDay > 0) {
                        return('К сожалению у вас уровень дохода ниже среднего');
                        } else if (this.budgetDay <= 0){
                        return('Что то пошло не так'); 
                        }
        };

        AppData.prototype.getInfoDeposit = function() {
            if(this.deposit){
                do {
                this.percentDeposit  = prompt('Какой годовой процент?', 5);
                }
                while (!isNumber(this.percentDeposit));
                do {
                this.percentDeposit  = prompt('Какая сумма заложена?', 10000);
                }
                while (!isNumber(this.percentDeposit));
            }
        };

        AppData.prototype.calcSaveMoney = function(){
          return this.budgetMonth * periodSelect.value;
        };

        AppData.prototype.getCounterPeriod = function(){
                let periodAmount = document.querySelector('.period-amount');
                periodAmount.textContent = periodSelect.value;
                this.showResult();
            
        };

        AppData.prototype.checkSalaryAmount = function(){
            if(salaryAmount.value === ''){
                start.setAttribute("disabled", "disabled");
            }else {
                start.removeAttribute("disabled");
            }
        };

        AppData.prototype.buttonStartBlock = function(){
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
            expensesPlus.setAttribute("disabled", "disabled");
            incomePlus.setAttribute("disabled", "disabled");
        };

        AppData.prototype.cancelRemoveData = function(){  
            const _this = this;        
            expensesItem.forEach(function(item){
                if(expensesItem.length > 1){
                    item.remove();
                    expensesItem = document.querySelectorAll('.expenses-items');
                    document.querySelector('.expenses-amount').value = '';
                    document.querySelectorAll('.expenses-title')[1].value = '';
                    expensesPlus.style.display = 'block';
                }
            }, _this);
            incomeItems.forEach(function(item){
                if(incomeItems.length > 1){
                    item.remove();
                    incomeItems = document.querySelectorAll('.income-items');
                    document.querySelectorAll('.income-title')[1].value = '';
                    document.querySelector('.income-amount').value = '';
                    incomePlus.style.display = 'block';
                    
                }
            }, _this);
            
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
                _this.showResult();
                targetMonthValue.value = "";
                expensesPlus.removeAttribute("disabled", "disabled");
                incomePlus.removeAttribute("disabled", "disabled");
        };

        const appData = new AppData();

        console.log(appData);
        

        AppData.prototype.eventListeners = function() {
            const _this = this;
            
            start.addEventListener('click',this.start.bind(_this)); 
            cancel.addEventListener('click', this.cancelRemoveData.bind(_this));
            periodSelect.addEventListener('input', this.getCounterPeriod.bind(_this));
            salaryAmount.addEventListener('input', this.checkSalaryAmount.bind(_this));
            incomePlus.addEventListener('click', this.addIncomeBlock.bind(_this));
            expensesPlus.addEventListener('click', this.addExpensesBlock.bind(_this));

            for (let symbol of appData.addExpenses) {
            symbol = symbol.charAt(0).toUpperCase() + symbol.substring(1);
            result += symbol + ', ';
            }
        };
        AppData.prototype.eventListeners();

            