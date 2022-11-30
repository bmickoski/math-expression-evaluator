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
  private extractNumbersAndOperands(input: string): (string | number)[] {
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
      throw new Error(`Invalid char ${char} at position ${iterator}`);
    }

    return chars;
  }

  /**
   * Convert infix to postfix polish notation
   *
   * @param chars chars
   * @returns transformed postfix array of chars
   */
  private convertInfixToPostfix(chars: (string | number)[]) {
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
      if (/[+\-/*<>=^]/.test(char)) {
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

      throw new Error(`Unparsed char ${char} at position ${i}`);
    }

    for (let i = operators.length - 1; i >= 0; i--) {
      postfixArray.push(operators[i]);
    }

    return postfixArray;
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

  evaluate(input: string): any {
    return this.convertInfixToPostfix(this.extractNumbersAndOperands(input));
  }
}
