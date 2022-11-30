import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EvaluatorService {
  public extractNumbersAndOperands(input: string): string[] {
    let scanner = 0;
    const tokens = [];

    while (scanner < input.length) {
      const char = input[scanner];

      // If the character is a number add it tokens, ignore decimal for now
      if (/[0-9]/.test(char)) {
        tokens.push(char);
        scanner++;
        continue;
      }

      // If the character is a operand push it to tokens
      if (/[+\-/*(),^<>=]/.test(char)) {
        tokens.push(char);
        scanner++;
        continue;
      }

      // If the character is white space ignore it
      if (char === ' ') {
        scanner++;
        continue;
      }

      // If the character can't recognize, throw an error
      throw new Error(`Invalid token ${char} at position ${scanner}`);
    }

    return tokens;
  }
}
