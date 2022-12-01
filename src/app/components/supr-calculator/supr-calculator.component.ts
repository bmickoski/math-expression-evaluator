import { Component, OnInit } from '@angular/core';

import { CalculatorService } from '../../services/calculator.service';
import { EvaluatorService } from '../../services/evaluator.service';

import { KeyPad } from '../../models/keypad.model';

@Component({
  selector: 'app-supr-calculator',
  templateUrl: './supr-calculator.component.html',
  styleUrls: ['./supr-calculator.component.scss'],
})
export class SuprCalculatorComponent implements OnInit {
  /**
   * Error value
   */
  errValue: any;

  /**
   * Keypad
   */
  keypad!: KeyPad[];

  /**
   * Calculator
   */
  displayValue: string = '';

  /**
   * Valid indicator
   */
  isValid: boolean = false;

  constructor(
    private calculatorService: CalculatorService,
    private evaluatorService: EvaluatorService
  ) {}

  /**
   * On init get keypads
   */
  ngOnInit(): void {
    this.keypad = this.calculatorService.getKeyPads();
  }

  /**
   * Generate random number
   */
  onRandomNumber() {
    this.calculatorService.generateRandomNumber().subscribe((number) => {
      this.displayValue += number;
    });
  }

  /**
   * Process key
   */
  processKey(val: number | string) {
    if (val === 'AC') {
      this.resetCalculator();
    } else {
      this.displayValue += val;
      this.isValid = this.evaluatorService.validateExpression(
        this.displayValue
      );
    }
  }

  resetCalculator() {
    this.displayValue = '';
  }

  evaluate() {
    if (this.isValid) {
      this.displayValue = this.evaluatorService.evaluate(this.displayValue);
    } else {
      this.displayValue = 'Invalid expression';
    }
  }
}
