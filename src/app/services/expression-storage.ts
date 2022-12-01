import { Injectable } from '@angular/core';
import { Expression } from '../models/expression.model';

/**
 * Name of localstorage property to store Expressions
 */
const EXPRESSIONS = 'EXPRESSIONS';

/**
 * Service contains methods to perform expression storage logic
 */
@Injectable({
  providedIn: 'root',
})
export class ExpressionStorage {
  /**
   * Add new expression
   *
   * @param expression New expression
   */
  setExpression(expression: Expression): void {
    const existingExpressions = this.getExpressions();
    if (existingExpressions.length > 0) {
      if (existingExpressions.length === 5) {
        existingExpressions.shift();
      }
      existingExpressions.push(expression);
      localStorage.setItem(EXPRESSIONS, JSON.stringify(existingExpressions));
    } else {
      const expressions = [expression];
      localStorage.setItem(EXPRESSIONS, JSON.stringify(expressions));
    }
  }

  /**
   * Get expressions
   */
  getExpressions() {
    const expressions = localStorage.getItem(EXPRESSIONS);
    if (expressions) {
      return JSON.parse(expressions);
    } else {
      return [];
    }
  }
}
