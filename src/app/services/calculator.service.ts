import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeyPad } from '../models/keypad.model';

const KEYPADS = [
  { label: '7', value: 7, color: 'btn-secondary' },
  { label: '8', value: 8, color: 'btn-secondary' },
  { label: '9', value: 9, color: 'btn-secondary' },
  { label: 'x', value: '*', color: 'btn-warning' },
  { label: '4', value: 4, color: 'btn-secondary' },
  { label: '5', value: 5, color: 'btn-secondary' },
  { label: '6', value: 6, color: 'btn-secondary' },
  { label: '+', value: '+', color: 'btn-warning' },
  { label: '1', value: 1, color: 'btn-secondary' },
  { label: '2', value: 2, color: 'btn-secondary' },
  { label: '3', value: 3, color: 'btn-secondary' },
  { label: '-', value: '-', color: 'btn-warning' },
  { label: 'AC', value: 'AC', color: 'btn-warning' },
  { label: '.', value: '.', color: 'btn-secondary' },
  { label: '0', value: 0, color: 'btn-secondary' },
  { label: '/', value: '/', color: 'btn-warning' },
];

/**
 * Service contains methods to perform expression storage logic
 */
@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private http: HttpClient) {}

  /**
   * Get expressions
   */
  getKeyPads(): KeyPad[] {
    return KEYPADS;
  }

  /**
   * Generate random number
   */
  generateRandomNumber(): Observable<any> {
    return this.http.get(
      'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new'
    );
  }
}
