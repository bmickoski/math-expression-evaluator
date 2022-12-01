import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalculatorComponent } from './components/calculator/calculator.component';
import { SuprCalculatorComponent } from './components/supr-calculator/supr-calculator.component';

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
      {
        path: 'supr-calculator',
        component: SuprCalculatorComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
