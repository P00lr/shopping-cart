import { Component } from '@angular/core';
import { CartItems } from '../../model/cart-items.model';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.component.html',
})
//este componente es hermano de cart-app y navbar e igual se puede pasar informacion sin ser hijo o padre
export class ShoppingCartComponent {
  cartItems: CartItems[] = [];  
  total!: number;


  //aqui le estamos pasando los cartItems mediante el estado de las rutas "pasando datos mediante ruta"
  // ya no depende de @input
  constructor(
    private sharingDataService:  SharingDataService,
    private router: Router
  ) {
    //pasando los cartItems de navbar a shoppingCart 
    this.cartItems = this.router.getCurrentNavigation()?.extras.state!['cartItems'];
    //pasando el total de navbar a shoppingCart 
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  removeFromCart(id: number): void {
    //el idProductEventEmitter llama al metodo get que esta en SharingDataService
    //esto emite para quien quiera usarlo
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
