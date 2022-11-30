import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EvaluatorService {
  public extractNumbersAndOperands(input: string): (string | number)[] {
    let iterator = 0;
    const tokens = [];

    while (iterator < input.length) {
      const char = input[iterator];

      // If the character is a number add it tokens
      if (/[0-9]/.test(char)) {
        let digits = '';

        while (iterator < input.length && /[0-9\.]/.test(input[iterator])) {
          digits += input[iterator++];
        }

        const number = parseFloat(digits);
        tokens.push(number);
        iterator++;
        continue;
      }

      // If the character is a operand push it to tokens
      if (/[+\-/*(),^<>=]/.test(char)) {
        tokens.push(char);
        iterator++;
        continue;
      }

      // If the character is white space ignore it
      if (char === ' ') {
        iterator++;
        continue;
      }

      // If the character can't recognize, throw an error
      throw new Error(`Invalid token ${char} at position ${iterator}`);
    }

    return tokens;
  }
}
