import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItems } from '../../../model/cart-items.model';

@Component({
  selector: 'cart-product',
  imports: [],
  templateUrl: './cart-product.component.html',
})
export class CartProductComponent {
  @Input() article!: CartItems;
  @Output() removeFromCartEventEmitter = new EventEmitter();

  removeFromCart(id: number): void {
    this.removeFromCartEventEmitter.emit(id);
  }
}
//no se uso este componente por que no se muestra como deberia en el modal
