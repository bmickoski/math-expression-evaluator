import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalculatorComponent } from './components/calculator/calculator.component';

/**
 * Define application root routes
 */
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: CalculatorComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
