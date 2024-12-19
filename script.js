let firstOperand = '';
let secondOperand = '';
let operator = '';
let indexOfOperator = '';
let result = '';
const expression = [];
let percentMode = false;
let finishFlag = false;
let isNegativeNum = false;
let isOperatorReceived = false;
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const actions = ['-', '+', '*', '/', '%'];

const display = document.querySelector('.display');

function clearAll() {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    indexOfOperator = '';
    result = '';
    percentMode = false;
    finishFlag = false;
    expression.splice(0);
    display.value = '0';
}

function deleteLastChar() {
    if (expression.length > 0) {
        expression.pop();
        display.value = expression.join('') || '0';
    }
}

function clearOperands() {
    firstOperand = '';
    secondOperand = '';
}

function calculate(num1, operator, num2, isPercent) {
    if (isPercent) {
        num2 = (num1 * num2) / 100;
    }

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) return "Не определено";
            return num1 / num2;
        default:
            return 'Ошибка: неверный оператор';
    }
}

document.querySelector('.buttons').onclick = (event) => {
    const key = event.target.textContent;

    if (!event.target.classList.contains('btn')) return;

    if (event.target.classList.contains('ac')) {
        clearAll();
        return;
    }

    if (event.target.classList.contains('C') && finishFlag) {
        clearAll();
        finishFlag = false;
        return;
    }

    if (event.target.classList.contains('C')) {
        deleteLastChar();
        return;
    }

    if (display.value.length > 12) return


    if (digits.includes(key)) {
        if (expression[expression.length - 1] === '%') return;
        if (actions.includes(expression[expression.length - 2]) && expression[expression.length - 1] === '0' && key === '0') {
            expression.push('.');
        }

        if (finishFlag) {
            clearAll();
            finishFlag = false;
        }

        if (
            key === '.' &&
            expression.includes('.') && !expression.some((char) => actions.includes(char))
        ) return;

        else if (
            key === '.' &&
            expression.slice(expression.findIndex((char) => actions.includes(char))).includes('.')
        ) return;

        if (expression.length === 0 && key === '.') {
            expression.push('0');
        }

        if (expression[0] === '0' && key !== '.') {
            expression[1] = '.';
        }

        expression.push(key);
        display.value = expression.join('');
        return;
    }

    if (actions.includes(key) && key !== '%') {

        finishFlag = false;
        if (expression.length === 0 && key !== '-') return;
        if (actions.includes(expression[expression.length - 1])) return;

        expression.push(key);

        if (isOperatorReceived) return;
        operator = key;
        isOperatorReceived = true;
        display.value = expression.join('');
        return;
    }

    if (key === '%') {
        if (expression[expression.length - 1] === '%' || actions.includes(expression[expression.length - 1])) return;
        if (expression.length === 0) return;
        percentMode = true;

        if (expression.some((char) => actions.includes(char))) {
            display.value = expression.join('') + '%';
            expression.push('%');
            percentMode = false;
        } else {
            const num = parseFloat(expression.join(''));
            const percentage = num / 100;
            percentMode = false;
            display.value = percentage.toFixed(3) * 1;
            expression.length = 0;
            expression.push(String(percentage));
            isPercent = false;
        }
        return;
    }

    if (key === '=') {
        if (actions.includes(expression[expression.length - 1]) && expression[expression.length - 1] !== '%') return

        if (!operator || finishFlag) return;

        if (expression[0] === '-') {
            isNegativeNum = true;
            expression.shift();
        }

        if (expression[0] === '-') {
            expression.shift()
        }

        if (expression[0] === '-') {
            indexOfOperator = expression.pop().findIndex((char) => actions.includes(char));
        }
        indexOfOperator = expression.findIndex((char) => actions.includes(char));

        firstOperand = parseFloat(expression.slice(0, indexOfOperator).join(''));

        if (isNegativeNum) {
            firstOperand = firstOperand * -1;
            isNegativeNum = false;
        }

        secondOperand = parseFloat(expression.slice(indexOfOperator + 1).filter((c) => c !== '%').join(''));

        if (expression.includes('%')) {
            secondOperand = (firstOperand * secondOperand) / 100; // Вычисляем процент от первого операнда
        }

        if (!secondOperand && secondOperand !== 0) return;

        result = calculate(firstOperand, operator, secondOperand, false).toFixed(6) * 1;
        if (result === "Не определено" || result === "Ошибка: неверный оператор") return;

        clearOperands();
        expression.splice(0);
        display.value = (result % 1 === 0) ? result : result.toFixed(6) * 1;
        expression.push(...result.toString().split(''));
        firstOperand = result;
        percentMode = false;
        finishFlag = true;
        isOperatorReceived = false;
        return;
    }
};