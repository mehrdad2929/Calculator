function operate(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case 'x': return a * b;
        case '/': return b !== 0 ? a / b : 'Error: Division by zero';
        default: return 'Error: Invalid operator';
    }
}
function calculateResult(expression) {
    // Remove spaces and replace 'x' with '*' for multiplication
    expression = expression.replace(/\s/g, '').replace(/x/g, '*');
    
    // Split the expression into numbers and operators
    const numbers = expression.split(/[+\-*/]/).map(num => parseFloat(num));
    const operators = expression.replace(/[0-9.]/g, '').split('');

    // Perform multiplication and division first
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*' || operators[i] === '/') {
            numbers.splice(i, 2, operate(operators[i], numbers[i], numbers[i+1]));
            operators.splice(i, 1);
            i--;
        }
    }

    // Then perform addition and subtraction
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        result = operate(operators[i], result, numbers[i+1]);
    }

    return result;
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.calc-btn');
    const display = document.getElementById('display');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            if (value === 'clear') {
                display.value = '';
            } else if (value === '=') {
                display.value = calculateResult(display.value);
            } else {
                display.value += value;
            }
            
            console.log('Button clicked:', value); // Add this line for debugging
            console.log('Display value:', display.value); // Add this line for debugging
        });
    });
});