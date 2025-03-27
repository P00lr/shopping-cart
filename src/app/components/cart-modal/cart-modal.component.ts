import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";
import { CartItems } from '../../model/cart-items.model';

@Component({
  selector: 'cart-modal',
  imports: [ShoppingCartComponent],
  templateUrl: './cart-modal.component.html',
  styles: ``
})
export class CartModalComponent {

  @Input() cartItems: CartItems[] = [];
  @Input() total!: number; 
  @Output() closeCartEventEmitter = new EventEmitter();
  @Output() removeFromCartEventEmitter = new EventEmitter();

  closeCart(): void {
    this.closeCartEventEmitter.emit();
  }
  removeFromCart(id: number): void {
    this.removeFromCartEventEmitter.emit(id);
  }
  
}
