'use strict';
let incomeItems = document.querySelectorAll('.income-items'),
    expensesItem = document.querySelectorAll('.expenses-items');

const start = document.getElementById('start'),
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
    incomeItem = document.querySelector('.income-items'),
    incomeTitle = document.querySelectorAll('.income-title')[1],
    incomeAmount = document.querySelector('.income-amount'),
    additionalIncomeData1 = document.querySelectorAll('.additional_income-item')[0],
    additionalIncomeData2 = document.querySelectorAll('.additional_income-item')[1],
    expensesItems = document.querySelector('.expenses-items'),
    expensesTitle = expensesItems.querySelector('.expenses-title'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    expensesAmountValue = document.querySelector('.expenses-amount'),   
    depositCheckmark = document.querySelector('.deposit-checkmark'),
    depositCheckmarkClone = depositCheckmark.cloneNode(),
    depositLabel = document.querySelector('.deposit-label'),
    depositBank = document.querySelector('.deposit-bank'),
    periodAmount = document.querySelector('.period-amount');
    

    
        
class AppData {
    constructor(){
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
}

start (){
            
            this.budget = +salaryAmount.value;
            this.checkSalaryAmount();
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses(); 
            this.getAddIncome();
            this.getInfoDeposit();
            this.getBudget();
            this.showResult();
            this.buttonStartBlock();
            this.depositPersentValue();
}

finish(){

    this.budget = +salaryAmount.value;
    this.checkSalaryAmount();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses(); 
    this.getAddIncome();
    this.getBudget();
    this.showResult();
}

blockingInput(){
    budgetMonthValue.value = 0;
    budgetDayValue.value = 0;
    expensesMonthValue.value = 0;
    additionalExpensesValue.value = 0;
    additionalIncomeValue.value = 0;
    targetMonthValue.value = 0;
    incomePeriodValue.value =  0;
}

showResult (){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses;
    additionalIncomeValue.value = this.addIncome;
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value =  this.calcSaveMoney();
}

addExpensesBlock(){        
    const cloneExpensesItem = expensesItem[0].cloneNode(true);            
    expensesItem[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItem = document.querySelectorAll('.expenses-items');            
    if(expensesItem.length === 3){
        expensesPlus.style.display = 'none';
    }
}

addIncomeBlock(){
    const cloneIncomeItem = incomeItems[0].cloneNode(true);            
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);            
    incomeItems = document.querySelectorAll('.income-items');            
    if(incomeItems.length === 3){
        incomePlus.style.display = 'none';
    }
    
}

getExpenses(){
    expensesItem.forEach(function(item){
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = +item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;
        }   
        
        
    }, this);
}

getIncome(){
    
    incomeItems.forEach(function(item){
    const itemIncome = item.querySelector('.income-title').value;
    const cashIncome = +item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== ''){
        this.income[itemIncome] = cashIncome;
    }        
    
    }, this);
    for(let key in this.income){
        this.incomeMonth += +this.income[key];
    }
}

getAddExpenses(){
    
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
            this.addExpenses.push(item);
        } 
        
    }, this);
}

getAddIncome(){
    
    additionalIncomeItem.forEach(function(item){
        const itemValue = item.value.trim();
        if(itemValue !== ''){
            this.addIncome.push(itemValue);
        } 
        
    }, this);
}

  //  считает сумму обязательных рассходов
getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +(this.expenses[key]);
        }
        
}

getBudget () {
            const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
            this.budgetMonth = +this.budget + this.incomeMonth - +this.expensesMonth + monthDeposit;
            this.budgetDay = Math.ceil(+this.budgetMonth / 30);            
            return  Number(this.budget) - Number(this.expensesMonth);
            
}

// Функция подсчитывает за какой период будет достигнута цель
getTargetMonth() {
                return Number(targetAmount.value) / Number(this.budgetMonth);
}

getStatusIncome() {
                if (this.budgetDay >= 1200) {
                return('У вас высокий уровень дохода!');
                } else if (1200 > this.budgetDay && this.budgetDay >= 600) {
                return('У вас средний уровень дохода!');
                } else if (this.budgetDay < 600 && this.budgetDay > 0) {
                return('К сожалению у вас уровень дохода ниже среднего');
                } else if (this.budgetDay <= 0){
                return('Что то пошло не так'); 
                }
}

getInfoDeposit () {
    const isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    if(this.deposit){
        this.percentDeposit  = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
}

calcSaveMoney(){
  return this.budgetMonth * periodSelect.value;
}

getCounterPeriod(){
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = periodSelect.value;
        this.showResult();
    
}

checkSalaryAmount(){
    if(salaryAmount.value === ''){
        start.setAttribute("disabled", "disabled");
    }else {
        start.removeAttribute("disabled");
    }
}

buttonStartBlock(){
    expensesItem.forEach(function(item){
        if(expensesItem.length >= 1){
            item.querySelector('.expenses-title').setAttribute("readonly", "readonly");
            item.querySelector('.expenses-amount').setAttribute("readonly", "readonly");
        }
    }, this);
    incomeItems.forEach(function(item){
        if(incomeItems.length >= 1){
            item.querySelector('.income-title').setAttribute("readonly", "readonly");
            item.querySelector('.income-amount').setAttribute("readonly", "readonly");
        }
    }, this);
    
    salaryAmount.setAttribute("readonly", "readonly");
    incomeAmount.setAttribute("readonly", "readonly");
    incomeTitle.setAttribute("readonly", "readonly");
    depositAmount.setAttribute("readonly", "readonly");
    expensesAmountValue.setAttribute("readonly", "readonly");
    expensesTitle.setAttribute("readonly", "readonly");            
    depositPercent.setAttribute("readonly", "readonly");
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
    depositBank.setAttribute('disabled', 'disabled');
    depositCheck.setAttribute('disabled', 'disabled');
    
}

cancelRemoveData(){  
            
    expensesItem.forEach(function(item){
        if(expensesItem.length > 1){
            item.remove();
            expensesItem = document.querySelectorAll('.expenses-items');
            document.querySelector('.expenses-amount').value = '';
            document.querySelectorAll('.expenses-title')[1].value = '';
            expensesPlus.style.display = 'block';
        }
    }, this);
    incomeItems.forEach(function(item){
        if(incomeItems.length > 1){
            item.remove();
            incomeItems = document.querySelectorAll('.income-items');
            document.querySelectorAll('.income-title')[1].value = '';
            document.querySelector('.income-amount').value = '';
            incomePlus.style.display = 'block';
            
        }
    }, this);
    
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
    document.querySelectorAll('.income-title')[1].removeAttribute("readonly", "readonly");
    additionalIncomeData1.removeAttribute("readonly", "readonly");
    additionalIncomeData2.removeAttribute("readonly", "readonly");
    expensesAmountValue.removeAttribute("readonly", "readonly");
    expensesTitle.removeAttribute("readonly", "readonly");
    additionalExpensesItem.removeAttribute("readonly", "readonly");
    targetAmount.removeAttribute("readonly", "readonly");
    depositAmount.removeAttribute("readonly", "readonly");
    depositCheck.checked = false;
    depositPercent.removeAttribute("readonly", "readonly");
    depositPercent.style.display = 'none';
    depositAmount.style.display = 'none';
    depositBank.style.display = 'none';
    depositPercent.value = '';
    depositAmount.value = '';
    depositBank.value = '';
    periodSelect.value = 1;
    periodAmount.textContent = 1;
    depositBank.removeAttribute('disabled', 'disabled');
    depositCheck.removeAttribute('disabled', 'disabled');
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
        this.showResult();
        targetMonthValue.value = "";
        expensesPlus.removeAttribute("disabled", "disabled");
        incomePlus.removeAttribute("disabled", "disabled");
}
changePersent(){
    const valueSelect = this.value;
    if(valueSelect === 'other'){
        depositPercent.style.display = 'inline-block';
        depositPercent.value = '';
        
    }else{
        depositPercent.value = valueSelect;
        depositPercent.style.display = 'none';
    }
    
}
depositHandler(){
    if(depositCheck.checked){
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        // depositPercent.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePersent);
    }else{
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        depositPercent.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePersent);
    }
}

depositPersentValue(){
    depositPercent.value > 100 ? 
    (alert("Введите корректное значение в поле проценты (до 100)"), 
                start.setAttribute("disabled", "disabled") )
    : (start.removeAttribute("disabled", "disabled"));
    
    
}

eventListeners() {
    start.addEventListener('click',this.start.bind(this)); 
    cancel.addEventListener('click', this.cancelRemoveData.bind(this));
    periodSelect.addEventListener('input', this.getCounterPeriod.bind(this));
    salaryAmount.addEventListener('input', this.checkSalaryAmount.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    depositPercent.addEventListener('input', this.depositPersentValue.bind(this));
}
}


const appData = new AppData();

        
        

appData.eventListeners();
        





