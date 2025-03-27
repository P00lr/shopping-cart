import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItems } from '../../model/cart-items.model';

@Component({
  selector: 'shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  @Input() cartItems: CartItems[] = [];  
  @Input() total!: number;

  @Output() removeFromCartEventEmitter = new EventEmitter();

  removeFromCart(id: number): void {
    this.removeFromCartEventEmitter.emit(id);
  }
}
