import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItems } from '../../model/cart-items.model';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() cartItems: CartItems[] = [];
  @Output() opoenCartEventEmitter = new EventEmitter();

  openCart(): void {
    this.opoenCartEventEmitter.emit();
  }
}
