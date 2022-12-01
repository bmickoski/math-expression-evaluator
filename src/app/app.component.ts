import { EvaluatorService } from './services/evaluator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  expression = '5 + 10 * (5 + 2 + 4)';
  invalidExpression = '3 * (4 - 2) + 1 * 5';

  constructor(private evaluatorService: EvaluatorService) {}
  ngOnInit(): void {
    // console.log(this.evaluatorService.evaluate(this.expression));
    // console.log(this.evaluatorService.evaluate(this.invalidExpression));
  }
}
