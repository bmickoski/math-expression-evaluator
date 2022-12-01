import { Injectable } from '@angular/core';

const precedence: any = { '*': 1, '/': 1, '+': 0, '-': 0 };
const leftParenthesis = '(';
const rightParenthesis = ')';
const functions = ['sin', 'cos', 'tan'];

@Injectable({ providedIn: 'root' })
export class EvaluatorService {
  /**
   * Extract numbers and operands in array
   *
   * @param input Input
   * @returns array with numbers and operands
   */
  extractNumbersAndOperands(input: string): number | string {
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

      // If the character is the first character of a name,
      // like the name of a function or variable or variable pointer
      if (/[a-z]/.test(char)) {
        // Create a string to hold all the characters in the name
        let name = '';

        // While we have more characters that make up the name and we haven't
        // gotten to the end of the input...
        while (iterator < input.length && /[a-z]/.test(input[iterator])) {
          // Collect all the characters in the name
          name += input[iterator++];
        }

        // Then push the full name to the array of tokens
        chars.push(name);
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
      if (/[+\-/*a-z]/.test(char)) {
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
    return (
      /[a-z]/.test(lastOperator) ||
      precedence[lastOperator] >= precedence[nextChar]
    );
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

      // If the token is a function name...
      if (/^[a-z]/.test(char)) {
        // Apply the function on the stack and push the result to the stack
        stack.push(this.applyFnc(char, stack));
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
        return `Invalid operator: ${operator}`;
    }
  }

  /**
   * Extract numbers and operands in array
   *
   * @param input Input
   * @returns array with numbers and operands
   */
  validateExpression(input: string): boolean {
    let iterator = 0;
    let opening = ['('];
    let closing = [')'];
    const braces = [];
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
        continue;
      }

      // If the character is the first character of a function name
      // create function name to hold all chars and check if that function
      // is defined in allowed functions
      if (/[a-z]/.test(char)) {
        let name = '';

        // While we have more characters that make up the name and we haven't
        // gotten to the end of the input...
        while (iterator < input.length && /[a-z]/.test(input[iterator])) {
          // Collect all the characters in the name
          name += input[iterator++];
        }

        if (functions.includes(name)) {
          continue;
        } else {
          return false;
        }
      }

      if (/[+\-/*(),]/.test(char)) {
        if (char === leftParenthesis || char === rightParenthesis) {
          braces.push(char);
        }
        // if expression ends with operand return false
        if (iterator === input.length - 1 && char !== rightParenthesis) {
          return false;
        }
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
      return false;
    }

    if (braces.length > 0) {
      return this.checkForClosingParenthesis(braces, opening, closing);
    } else {
      return true;
    }
  }

  /**
   * Check if all open parenthesis are closed
   *
   * @param braces Braces
   * @param opening Opening braces
   * @param closing Closing braces
   * @returns all parenthesis closed or not
   */
  checkForClosingParenthesis(
    braces: string[],
    opening: string[],
    closing: string[]
  ): boolean {
    let arr = [];
    for (let i = 0; i < braces.length; i++) {
      if (opening.includes(braces[i])) {
        arr.push(braces[i]);
      } else if (
        closing.indexOf(braces[i]) === opening.indexOf(arr[arr.length - 1])
      ) {
        arr.pop();
      } else return false;
    }
    return arr.length === 0;
  }

  /**
   * Returns the result of applying the function onto the stack.
   * The function arguments are in right-to-left order in the stack
   *
   * @param funcName Function name
   * @param stack Opening braces
   * @returns match calculation
   */
  applyFnc(funcName: string, stack: any) {
    if (funcName === 'sin') {
      const a = stack.pop();
      return Math.sin(a);
    }

    if (funcName === 'cos') {
      const a = stack.pop();
      return Math.cos(a);
    }

    if (funcName === 'tan') {
      const a = stack.pop();
      return Math.tan(a);
    }

    return `Undefined function: ${funcName}`;
  }
}
