import { Injectable } from '@angular/core';

const precedence: any = { '*': 1, '/': 1, '+': 0, '-': 0 };
const leftParenthesis = '(';
const rightParenthesis = ')';

@Injectable({ providedIn: 'root' })
export class EvaluatorService {
  /**
   * Extract numbers and operands in array
   *
   * @param input Input
   * @returns array with numbers and operands
   */
  private extractNumbersAndOperands(input: string): number | string {
    let iterator = 0;
    const chars = [];

    while (iterator < input.length) {
      const char = input[iterator];

      // If the character is a number...
      if (/[0-9]/.test(char)) {
        // Create a string to hold all the digits in the number
        let digits = '';

        // While we have more digits (or a period) in the number and we haven't
        // gotten to the end of the input...
        while (iterator < input.length && /[0-9\.]/.test(input[iterator])) {
          digits += input[iterator++];
        }

        // Convert the digits to a number and push the number to the array of chars
        const number = parseFloat(digits);
        chars.push(number);
        continue;
      }

      // If the character is a operand push it to chars
      if (/[+\-/*(),^<>=]/.test(char)) {
        chars.push(char);
        iterator++;
        continue;
      }

      // If the character is white space...
      if (char === ' ') {
        // Ignore it
        iterator++;
        continue;
      }

      // If the character can't recognize, throw an error
      return `Invalid char ${char} at position ${iterator}`;
    }

    return this.convertInfixToPostfix(chars);
  }

  /**
   * Convert infix to postfix polish notation
   *
   * @param chars chars
   * @returns transformed postfix array of chars
   */
  private convertInfixToPostfix(chars: (string | number)[]): number | string {
    const operators: string[] = [];
    const postfixArray: any[] = [];

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      // if char is a number push it to postfix array
      if (typeof char === 'number') {
        postfixArray.push(char);
        continue;
      }

      // if char is an operator check if there are oeprators in operators stack
      // with higher precedence than current one, if yes remove from operators and
      // add it to postfix array and then push current token to operators
      if (/[+\-/*]/.test(char)) {
        while (this.checkEqualOrHigherPrecedence(operators, char)) {
          postfixArray.push(operators.pop());
        }
        operators.push(char);
        continue;
      }

      if (char === leftParenthesis) {
        operators.push(char);
        continue;
      }

      if (char === rightParenthesis) {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== leftParenthesis
        ) {
          postfixArray.push(operators.pop());
        }
        operators.pop();
        continue;
      }

      return `Unparsed char ${char} at position ${i}`;
    }

    for (let i = operators.length - 1; i >= 0; i--) {
      postfixArray.push(operators[i]);
    }

    return this.evaluateExpression(postfixArray);
  }

  /**
   * Check whether top operator in operators has a higher or equal prescedence of nextChar
   *
   * @param operators Operators
   * @param nextChar next char
   * @returns should be removed or not
   */
  private checkEqualOrHigherPrecedence(
    operators: string[],
    nextChar: string
  ): boolean {
    if (operators.length === 0) {
      return false;
    }

    const lastOperator = operators[operators.length - 1];
    return precedence[lastOperator] >= precedence[nextChar];
  }

  /**
   * Check whether top operator in operators has a higher or equal prescedence of nextChar
   *
   * @param postfixArray Operators
   * @returns should be removed or not
   */
  private evaluateExpression(postfixArray: any[]): number | string {
    const stack: any = [];

    for (let i = 0; i < postfixArray.length; i++) {
      const char = postfixArray[i];

      // if it is an operator execute operation and add the result in stack
      if (/[+\-/*]/.test(char)) {
        stack.push(this.operate(char, stack));
        continue;
      }

      // if it is number push it to stack
      if (typeof char === 'number') {
        stack.push(char);
        continue;
      }
      return `Invalid char ${char}`;
    }

    // return actual stack which is the result of the evaluation
    return stack.pop();
  }

  evaluate(input: string): any {
    return this.extractNumbersAndOperands(input);
  }

  /**
   * Returns the result of appyling the mathematical operator on the stack.
   * @param operator Operators
   * @param stack Operators
   * @returns should be removed or not
   */
  private operate(operator: string, stack: any) {
    const b = stack.pop();
    const a = stack.pop();

    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }
}
