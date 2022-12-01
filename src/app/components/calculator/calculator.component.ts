import { Component, OnInit } from '@angular/core';

import { EvaluatorService } from '../../services/evaluator.service';
import { ExpressionModel } from '../../models/expression.model';
import { ExpressionStorage } from '../../services/expression-storage';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  /**
   * User input expression
   */
  userExpression!: string;

  /**
   * User epxression valid indicator
   */
  isValid: boolean = false;

  /**
   * Submittion
   */
  expressionSubmitted: boolean = false;

  /**
   * User expression
   */
  expressions: ExpressionModel[] = [];

  /**
   * User expression
   */
  result!: number;

  constructor(
    private evaluatorService: EvaluatorService,
    private expressionStorage: ExpressionStorage
  ) {}

  ngOnInit(): void {
    this.expressions = this.expressionStorage.getExpressions();
  }

  /**
   * On input change validate expression
   *
   * @param inputData Input data
   */
  onExpressionChange(inputData: string): void {
    this.expressionSubmitted = false;
    this.isValid = this.evaluatorService.validateExpression(inputData);
    console.log(this.isValid);
  }

  /**
   * On input change validate expression
   *
   */
  evaluateExpression(): void {
    this.expressionSubmitted = true;
    if (this.isValid) {
      this.result = this.evaluatorService.evaluate(this.userExpression);
      this.expressionStorage.setExpression({
        expression: this.userExpression,
        result: this.result,
      });
      this.expressions = this.expressionStorage.getExpressions();
      this.userExpression = '';
    }
  }
}
