import { Component, EventEmitter } from '@angular/core';
import { CartItems } from '../../model/cart-items.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.component.html',
})
//este componente es hermando de cart-app e igual se puede pasar informacion sin ser hijo o padre
export class ShoppingCartComponent {
  cartItems: CartItems[] = [];  
  total!: number;

  removeFromCartEventEmitter = new EventEmitter();

  //aqui le estamos pasando los cartItems mediante el estado de las rutas "pasando datos mediante ruta"
  // ya no depende de @input
  constructor(private router: Router) {
    //pasando los cartItems de navbar a shoppingCart 
    this.cartItems = this.router.getCurrentNavigation()?.extras.state!['cartItems'];
    //pasando el total de navbar a shoppingCart 
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  removeFromCart(id: number): void {
    this.removeFromCartEventEmitter.emit(id);
  }
}
